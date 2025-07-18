import { Component, inject, OnInit, signal } from '@angular/core';
import { RegulationHttpService } from '../../../service/regulation-http.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegulationItemFormData, RegulationSection } from '../../regulations.model';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-regulation',
    imports: [ReactiveFormsModule, ToggleSwitchModule, ButtonModule],
    templateUrl: './regulation.component.html'
})
export class RegulationComponent implements OnInit {
    private readonly regulationHttpService = inject(RegulationHttpService);
    private readonly fb = inject(FormBuilder);

    protected form!: FormGroup;
    protected sections: RegulationSection[] = [];
    protected loadForm = signal(false);
    private errorMessages: string[] = [];

    ngOnInit(): void {
        this.loadRegulations();
    }

    private loadRegulations(): void {
        this.regulationHttpService.getRegulationsByModelId(2).subscribe((response) => {
            this.sections = response;
            this.buildForm();
            this.loadForm.set(true);
        });
    }

    private buildForm(): void {
        this.form = this.fb.group({
            sections: this.fb.array(this.sections.map((section) => this.createSectionGroup(section)))
        });
    }

    private createSectionGroup(section: RegulationSection): FormGroup {
        return this.fb.group({
            id: [section.id],
            name: [section.name],
            validationType: [section.validationType],
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

    onSubmit(): void {
        const isCompliant = this.validateSections();
        if (!isCompliant) this.showErrors();
        console.log({ isCompliant });
    }
    private showErrors(): void {
        alert(this.errorMessages.join('\n'));
        this.errorMessages = [];
    }

    private validateSections(): boolean {
        return this.sections.every((section, index) => {
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

    private validateRequiredItems(section: RegulationSection, selectedItems: RegulationItemFormData[]): boolean {
        const requiredItems = section.regulationItems.filter((item) => item.isMandatory);
        const selectedItemIds = new Set(selectedItems.map((item) => item.id));
        const allRequiredSelected = requiredItems.every((item) => selectedItemIds.has(item.id));
        if (!allRequiredSelected) this.errorMessages.push(`La sección ${section.name} no cumple con los requisitos obligatorios.`);
        return allRequiredSelected;
    }

    private validateMinimumItems(section: RegulationSection, selectedItems: RegulationItemFormData[]): boolean {

        const meetsMinimum = selectedItems.length >= (section.minimumItems ?? 0);
        if (!meetsMinimum) this.errorMessages.push(`La sección ${section.name} no cumple con el número mínimo de elementos seleccionados. Elementos seleccionados: ${selectedItems.length}, mínimo requerido: ${section.minimumItems}`);
        const allRequiredItemsSelected = this.validateRequiredItems(section, selectedItems);
        return meetsMinimum && allRequiredItemsSelected;
    }

    private validateRequiredScore(section: RegulationSection, selectedItems: RegulationItemFormData[]): boolean {
        const totalScore = selectedItems.reduce((sum, item) => sum + (item.score ?? 0), 0);
        const requiredScore = section.minimumScore ?? 0;
        if (totalScore < requiredScore) {
            this.errorMessages.push(`La sección ${section.name} no cumple con el puntaje requerido. Puntuación actual: ${totalScore}, requerida: ${requiredScore}`);
        }
        return totalScore >= requiredScore;
    }

    get sectionsField(): FormArray {
        return this.form.get('sections') as FormArray;
    }

    getRegulationItemsField(sectionIndex: number): FormArray {
        return this.sectionsField.at(sectionIndex).get('regulationItems') as FormArray;
    }
}
