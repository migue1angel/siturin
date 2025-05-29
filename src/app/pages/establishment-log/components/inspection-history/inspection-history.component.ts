import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ColumnModel, inspectionsHistory } from '../../data';

@Component({
    selector: 'app-inspection-history',
    imports: [PanelModule, TableModule, ButtonModule],
    templateUrl: './inspection-history.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InspectionHistoryComponent {
    protected inspectionsHistory = inspectionsHistory;
    protected cols: ColumnModel[] = [
        { field: 'status', header: 'Estado' },
        { field: 'creationDate', header: 'Fecha de Creación' },
        { field: 'inspectionDate', header: 'Fecha de Inspección' },
        { field: 'queue', header: 'Bandeja' },
        { field: 'observations', header: 'Observaciones' }
    ];
}
