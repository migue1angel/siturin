import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component';
import { ProcedureListComponent } from './components/procedure-list/procedure-list.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-establishment-log',
    imports: [EstablishmentListComponent, ProcedureListComponent, ButtonModule, InputTextModule, ReactiveFormsModule, IconFieldModule, InputIconModule, DividerModule],
    templateUrl: './establishment-log.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstablishmentLogComponent {
    protected query = new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]);
    protected currentComponent: string = 'establishments';

    search(event: string) {
        if (this.query.valid) {
            console.log(this.query.value, 'hacer la consulta'); //hacer consulta al backend
        }
    }

    changeComponent(name: string) {
        this.currentComponent = name;
    }
}
