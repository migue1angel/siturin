import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { EstablishmentLogComponent } from './establishment-log/establishment-log.component';
import { RegulationSimulatorComponent } from './regulation-simulator/regulation-simulator.component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'log', component: EstablishmentLogComponent },
    { path: 'simulator', component: RegulationSimulatorComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
