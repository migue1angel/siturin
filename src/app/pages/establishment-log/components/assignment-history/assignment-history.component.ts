import { ChangeDetectionStrategy, Component } from '@angular/core';
import { assignmentsHistory, ColumnModel } from '../../data';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-assignment-history',
    imports: [TableModule],
    templateUrl: './assignment-history.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentHistoryComponent {
    protected assignmentsHistory = assignmentsHistory;

    protected cols: ColumnModel[] = [
        { field: 'assignmentDate', header: 'Fecha de Asignación' },
        { field: 'queue', header: 'Bandeja' },
        { field: 'observations', header: 'Observaciones' }
    ];
}
