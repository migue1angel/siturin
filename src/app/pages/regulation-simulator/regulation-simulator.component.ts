import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RegulationSimulatorFormComponent } from "./components/regulation-simulator-form/regulation-simulator-form.component";
import { RegulationComponent } from "./components/regulation/regulation.component";

@Component({
  selector: 'app-regulation-simulator',
  imports: [DividerModule, RegulationSimulatorFormComponent, RegulationComponent],
  templateUrl: './regulation-simulator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegulationSimulatorComponent { }
