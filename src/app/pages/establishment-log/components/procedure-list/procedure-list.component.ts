import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ColumnModel, procedures } from '../../data';
import { InspectionHistoryComponent } from "../inspection-history/inspection-history.component";
import { FluidModule } from 'primeng/fluid';
import { AssignmentHistoryComponent } from "../assignment-history/assignment-history.component";

@Component({
    selector: 'app-procedure-list',
    imports: [FluidModule, PanelModule, TableModule, ButtonModule, InputTextModule, InspectionHistoryComponent, AssignmentHistoryComponent],
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

    onRowExpand(event: TableRowExpandEvent) {
    }

    onRowCollapse(event: TableRowCollapseEvent) {
    }
}
