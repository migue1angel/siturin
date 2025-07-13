import { ChangeDetectionStrategy, Component, effect, inject, model, OnInit, resource, signal } from '@angular/core';
import { RegulationHttpService } from '../../../service/regulation-http.service';
import { firstValueFrom } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-regulation',
    imports: [DividerModule, ReactiveFormsModule],
    templateUrl: './regulation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegulationComponent {
    private readonly regulationHttpService = inject(RegulationHttpService);
    private readonly fb = inject(FormBuilder);
    protected form!: FormGroup;
    regulations = resource({
        request: () => ({ modelId: 2 }),
        loader: async ({ request }) => {
            return await firstValueFrom(this.regulationHttpService.getRegulationsByModelId(request.modelId));
        }
    });
    
    protected buildForm = effect(() => {
        if (!this.regulations.hasValue()) return;

        this.form = this.fb.group({
            sections: this.fb.array(
                this.regulations.value()!.map((section) => {
                    return this.fb.group({
                        id: [section.id],
                        validationType: [section.validationType],
                        regulationItems: this.fb.array(
                            section.regulationItems.map((item) => {
                                return this.fb.group({
                                    id: [item.id],
                                    isCompliant: [false]
                                });
                            })
                        )
                    });
                })
            )
        });
    });

    onSubmit() {
        console.log(this.form.value, 'form value');
    }

    get sections(): FormArray {
        return this.form.controls['sections'] as FormArray;
    }

    regulationItems(index: number): FormArray {
        return this.sections.at(index).get('regulationItems') as FormArray;
    }
}
