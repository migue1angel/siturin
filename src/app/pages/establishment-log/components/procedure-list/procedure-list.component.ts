import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ColumnModel, procedures } from '../../data';
import { InspectionHistoryComponent } from '../inspection-history/inspection-history.component';
import { FluidModule } from 'primeng/fluid';
import { AssignmentHistoryComponent } from '../assignment-history/assignment-history.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-procedure-list',
    imports: [CommonModule, FluidModule, PanelModule, TableModule, ButtonModule, InputTextModule, InspectionHistoryComponent, AssignmentHistoryComponent],
    templateUrl: './procedure-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcedureListComponent {
    protected procedures = procedures;
    protected navigate = output<string>();

    protected cols: ColumnModel[] = [
        { field: 'operation', header: 'Operación' },
        { field: 'registerNumber', header: 'Número de Registro' },
        { field: 'Date', header: 'Fecha' },
        { field: 'procedureType', header: 'Tipo de Procedimiento' },
        { field: 'catastroStatus', header: 'Estado del Catastro' }
    ];

    rowClass(expanded: boolean) {
        return { '!bg-primary !text-primary-contrast dark:bg-gray-800': expanded };
    }
}
