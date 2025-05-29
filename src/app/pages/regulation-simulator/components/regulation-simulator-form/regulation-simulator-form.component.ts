import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { CustomLabelDirective } from '../../../../shared/directives/custom-label.directive';
import { RegulationSimulatorFormEnum } from '../../enum';
import { SelectModule } from 'primeng/select';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-regulation-simulator-form',
    imports: [FluidModule, CustomLabelDirective, SelectModule, ReactiveFormsModule],
    templateUrl: './regulation-simulator-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegulationSimulatorFormComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    protected regulationSimulatorFormEnum = RegulationSimulatorFormEnum;
    protected contributorTypes = ['Persona Jurídica', 'Persona Natural'];
    protected activities = ['Actividad 1', 'Actividad 2'];
    protected geographicZones = ['Zona 1', 'Zona 2'];
    protected classifications = ['Clasificación 1', 'Clasificación 2'];
    protected categories = ['Categoría 1', 'Categoría 2'];

    protected form!: FormGroup;
    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            contributorType: [null],
            geographicZone: [null],
            activity: [null],
            classification: [null],
            category: [null]
        });
    }

    get contributorTypeField(): AbstractControl {
        return this.form.controls['contributorType'];
    }
}
