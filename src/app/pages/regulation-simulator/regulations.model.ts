export interface Regulations {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    validationType: null | string;
    minimumScore: null;
    minimumItems: null;
    order: number;
    modelId: number;
    isAdventureRequirement: boolean;
    isProtectedArea: boolean;
    regulationItems: RegulationItem[];
}

export interface RegulationItem {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    isMandatory: boolean;
    score: null;
    order: number;
    isVisible: boolean;
    isCompliant?: boolean; 
}
