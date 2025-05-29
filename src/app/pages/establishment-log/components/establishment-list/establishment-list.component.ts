import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { establishments, ColumnModel } from '../../data';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-establishment-list',
    imports: [PanelModule, TableModule, ButtonModule, InputTextModule],
    templateUrl: './establishment-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstablishmentListComponent {
    protected establishments = establishments;
    protected navigate = output<string>();
    protected cols: ColumnModel[] = [
        { field: 'number', header: 'Número de Registro' },
        { field: 'commercialName', header: 'Nombre Comercial' },
        { field: 'province', header: 'Provincia' },
        { field: 'district', header: 'Distrito' },
        { field: 'parish', header: 'Parroquia' },
        { field: 'address', header: 'Dirección' }
    ];


}
