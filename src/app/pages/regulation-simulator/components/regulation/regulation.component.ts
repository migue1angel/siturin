import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RegulationHttpService } from '../../../service/regulation-http.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegulationItemFormData, RegulationSection } from '../../regulations.model';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-regulation',
    imports: [ReactiveFormsModule, ToggleSwitchModule, ButtonModule],
    templateUrl: './regulation.component.html',
})
export class RegulationComponent implements OnInit, OnDestroy {
    private readonly regulationHttpService = inject(RegulationHttpService);
    private readonly fb = inject(FormBuilder);

    protected form!: FormGroup;
    protected sections: RegulationSection[] = [];
    protected loadForm = signal(false);
    private errorMessages: string[] = [];

    ngOnInit(): void {
        this.loadRegulations();
    }

    ngOnDestroy(): void {
        this.onIsProtectedAreaChanges().unsubscribe();
    }

    loadRegulations(): void {
        this.regulationHttpService
            .getRegulationsByModelId(2)
            .subscribe((resp) => {
                this.sections = resp;
                console.log(resp);
                
                this.buildForm();
                this.onIsProtectedAreaChanges();
                this.loadForm.set(true);
            });
    }

    buildForm(): void {
        const regularSections = this.sections.filter((section) => !section.isProtectedArea);

        this.form = this.fb.group({
            isProtectedArea: [false],
            sections: this.fb.array(regularSections.map((section) => this.createSectionGroup(section)))
        });
    }

    createSectionGroup(section: RegulationSection): FormGroup {
        return this.fb.group({
            id: [section.id],
            name: [section.name],
            validationType: [section.validationType],
            isProtectedArea: [section.isProtectedArea],
            minimumScore:[section.minimumScore],
            minimumItems: [section.minimumItems],
            regulationItems: this.fb.array(
                section.regulationItems.map((item) =>
                    this.fb.group({
                        id: [item.id],
                        name: [item.name],
                        isCompliant: [false],
                        isMandatory: [item.isMandatory],
                        score: [item.score]
                    })
                )
            )
        });
    }

    onIsProtectedAreaChanges() {
        return this.isProtectedAreaField.valueChanges.subscribe((isProtectedArea) => {
            const protectedSections = this.sections.filter((section) => section.isProtectedArea);

            if (isProtectedArea) {
                this.addProtectedAreaSections(protectedSections);
            } else {
                this.removeProtectedAreaSections(protectedSections);
            }
        });
    }

    addProtectedAreaSections(protectedSections: RegulationSection[]): void {
        protectedSections.forEach((section) => {
            const exists = this.sectionsField.value.some((s: any) => s.id === section.id);
            if (!exists) this.sectionsField.push(this.createSectionGroup(section));
        });
    }

    removeProtectedAreaSections(protectedSections: RegulationSection[]): void {
        protectedSections.forEach((section) => {
            const index = this.sectionsField.controls.findIndex((control) => control.value.id === section.id);
            if (index !== -1) this.sectionsField.removeAt(index);
        });
    }

    onSubmit(): void {
        const isCompliant = this.validateAllSections();
        console.log({ isCompliant, form: this.form.value });
        return this.showErrors();
    }

    validateAllSections(): boolean {
        this.errorMessages = [];
        return this.sections.every((section, index) => {
            if (section.isProtectedArea && !this.isProtectedAreaField.value) return true;

            const sectionForm = this.form.value.sections[index];

            const selectedItems = sectionForm.regulationItems.filter((item: RegulationItemFormData) => item.isCompliant);

            switch (section.validationType) {
                case 'REQUIRED_ITEMS':
                    return this.validateRequiredItems(section, selectedItems);
                case 'MINIMUM_ITEMS':
                    return this.validateMinimumItems(section, selectedItems);
                case 'REQUIRED_SCORE':
                    return this.validateRequiredScore(section, selectedItems);
                default:
                    return true;
            }
        });
    }

    validateRequiredItems(section: RegulationSection, selectedItems: RegulationItemFormData[]): boolean {
        const requiredItems = section.regulationItems.filter((item) => item.isMandatory);
        const selectedItemIds = new Set(selectedItems.map((item) => item.id));
        const allRequiredSelected = requiredItems.every((item) => selectedItemIds.has(item.id));

        if (!allRequiredSelected) {
            this.errorMessages.push(`La sección ${section.name} no cumple con los requisitos obligatorios.`);
        }

        return allRequiredSelected;
    }

    validateMinimumItems(section: RegulationSection, selectedItems: RegulationItemFormData[]): boolean {
        const minimumRequired = section.minimumItems ?? 0;
        const meetsMinimum = selectedItems.length >= minimumRequired;

        if (!meetsMinimum) {
            this.errorMessages.push(`La sección ${section.name} no cumple con el número mínimo de elementos. ` + `Seleccionados: ${selectedItems.length}, mínimo: ${minimumRequired}`);
        }

        const allRequiredSelected = this.validateRequiredItems(section, selectedItems);
        return meetsMinimum && allRequiredSelected;
    }

    validateRequiredScore(section: RegulationSection, selectedItems: RegulationItemFormData[]): boolean {
        const totalScore = selectedItems.reduce((sum, item) => sum + (item.score ?? 0), 0);
        const requiredScore = section.minimumScore ?? 0;
        const meetsScore = totalScore >= requiredScore;

        if (!meetsScore) {
            this.errorMessages.push(`La sección ${section.name} no cumple con el puntaje requerido. ` + `Puntuación: ${totalScore}, requerida: ${requiredScore}`);
        }

        return meetsScore;
    }

    showErrors(): void {
        if (this.errorMessages.length > 0) {
            alert(this.errorMessages.join('\n'));
        }
    }

    get sectionsField(): FormArray {
        return this.form.get('sections') as FormArray;
    }

    get isProtectedAreaField(): AbstractControl {
        return this.form.controls['isProtectedArea'];
    }

    getRegulationItemsField(sectionIndex: number): FormArray {
        return this.sectionsField.at(sectionIndex).get('regulationItems') as FormArray;
    }
}
