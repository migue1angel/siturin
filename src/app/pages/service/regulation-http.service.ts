import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegulationSection } from '../regulation-simulator/regulations.model';

@Injectable({
    providedIn: 'root'
})
export class RegulationHttpService {
    private readonly apiUrl = 'http://localhost:3000/regulation-sections';
    private readonly httpClient = inject(HttpClient);
    constructor() {}

    getRegulationsByModelId(modelId: number) {
        return this.httpClient.get<RegulationSection[]>(`${this.apiUrl}/model/${modelId}/sections`);
    }
}
