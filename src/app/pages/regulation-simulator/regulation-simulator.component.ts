import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RegulationSimulatorFormComponent } from './components/regulation-simulator-form/regulation-simulator-form.component';
import { RegulationComponent } from './components/regulation/regulation.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FormSubmission } from './regulations.model';

@Component({
    selector: 'app-regulation-simulator',
    imports: [DividerModule, RegulationSimulatorFormComponent, RegulationComponent, ToggleSwitchModule, FormsModule],
    templateUrl: './regulation-simulator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegulationSimulatorComponent {
    prueba = false;

    changeNumber = 2;
    onRegulationSubmitted(event: FormSubmission) {
        console.log(event);
    }
}
