export interface ColumnModel {
    field: string;
    header: string;
}

export interface EstablishmentLogModel {
    number: string;
    commercialName: string;
    province: string;
    district: string;
    parish: string;
    address: string;
}

export interface ProcedureModel {
    operation: string;
    registerNumber: string;
    Date: string;
    procedureType: string;
    catastroStatus: CatastroStatuses;
}

enum CatastroStatuses {
    Aprobado = 'Aprobado',
    Revisión = 'En Revisión',
    Rechazado = 'Rechazado',
    Ratificado = 'Ratificado'
}

export const establishments: EstablishmentLogModel[] = [
    {
        number: '1234567890123',
        commercialName: 'Comercial ABC',
        province: 'Pichincha',
        district: 'Quito',
        parish: 'La Mariscal',
        address: 'Av. Amazonas N34-123'
    },
    {
        number: '9876543210987',
        commercialName: 'Supermercado XYZ',
        province: 'Guayas',
        district: 'Guayaquil',
        parish: 'Urdesa',
        address: 'Calle 9 y Avenida 9'
    },
    {
        number: '4567891234567',
        commercialName: 'Ferretería El Clavo',
        province: 'Azuay',
        district: 'Cuenca',
        parish: 'El Vecino',
        address: 'Calle Larga 1234'
    },
    {
        number: '3216549873210',
        commercialName: 'Librería La Página',
        province: 'Manabí',
        district: 'Portoviejo',
        parish: 'San Pablo',
        address: 'Calle 5 de Junio 456'
    },
    {
        number: '7891234567890',
        commercialName: 'Panadería El Pan Caliente',
        province: 'El Oro',
        district: 'Machala',
        parish: 'El Cambio',
        address: 'Avenida 25 de Diciembre 789'
    },
    {
        number: '6543210987654',
        commercialName: 'Zapatería El Paso Firme',
        province: 'Los Ríos',
        district: 'Babahoyo',
        parish: 'El Salto',
        address: 'Calle Bolívar 321'
    },
    {
        number: '1237894561230',
        commercialName: 'Juguetería El Mundo de los Sueños',
        province: 'Esmeraldas',
        district: 'Esmeraldas',
        parish: 'La Florida',
        address: 'Avenida Libertad 654'
    },
    {
        number: '4561237894567',
        commercialName: 'Restaurante Sabor del Mar',
        province: 'Santa Elena',
        district: 'Salinas',
        parish: 'San Lorenzo',
        address: 'Calle Malecón 987'
    },
    {
        number: '7894561237890',
        commercialName: 'Boutique Elegancia',
        province: 'Tungurahua',
        district: 'Ambato',
        parish: 'Ficoa',
        address: 'Avenida Cevallos 123'
    },
    {
        number: '3219876543210',
        commercialName: 'Tecnología y Más',
        province: 'Cotopaxi',
        district: 'Latacunga',
        parish: 'El Ejido',
        address: 'Calle Bolívar 456'
    },
    {
        number: '6547893216540',
        commercialName: 'Licores y Bebidas El Buen Trago',
        province: 'Chimborazo',
        district: 'Riobamba',
        parish: 'La Paz',
        address: 'Avenida 9 de Octubre 789'
    },
    {
        number: '9873216549870',
        commercialName: 'Electrodomésticos Casa Blanca',
        province: 'Pastaza',
        district: 'Puyo',
        parish: 'El Jardín',
        address: 'Calle 10 de Agosto 123'
    },
    {
        number: '1234567890987',
        commercialName: 'Farmacia Salud y Vida',
        province: 'Orellana',
        district: 'Francisco de Orellana',
        parish: 'El Coca',
        address: 'Avenida Quito 456'
    },
    {
        number: '4567891230123',
        commercialName: 'Librería El Saber',
        province: 'Morona Santiago',
        district: 'Macas',
        parish: 'San Francisco',
        address: 'Calle Sucre 789'
    },
    {
        number: '7891234563456',
        commercialName: 'Carnicería El Buen Sabor',
        province: 'Napo',
        district: 'Tena',
        parish: 'Ahuano',
        address: 'Avenida Amazonas 321'
    },
    {
        number: '3216549876543',
        commercialName: 'Heladería Dulce Frío',
        province: 'Zamora-Chinchipe',
        district: 'Zamora',
        parish: 'Yantzaza',
        address: 'Calle Bolívar 654'
    },
    {
        number: '6543210981234',
        commercialName: 'Librería El Rincón del Saber',
        province: 'Sucumbíos',
        district: 'Nueva Loja',
        parish: 'El Rosal',
        address: 'Avenida 10 de Agosto 987'
    },
    {
        number: '1237894567890',
        commercialName: 'Zapatería El Paso Seguro',
        province: 'Carchi',
        district: 'Tulcán',
        parish: 'El Carmelo',
        address: 'Calle Sucre 123'
    },
    {
        number: '4561237890123',
        commercialName: 'Panadería La Tradición',
        province: 'Imbabura',
        district: 'Ibarra',
        parish: 'Caranqui',
        address: 'Avenida Atahualpa 456'
    },
    {
        number: '7894561234567',
        commercialName: 'Ferretería El Martillo Fuerte',
        province: 'Esmeraldas',
        district: 'Esmeraldas',
        parish: 'La Florida',
        address: 'Calle Bolívar 789'
    }
];

export const procedures: ProcedureModel[] = [
    {
        operation: 'Registro de Establecimiento',
        registerNumber: '1234567890123',
        Date: '2023-10-01',
        procedureType: 'Apertura',
        catastroStatus: CatastroStatuses.Aprobado
    },
    {
        operation: 'Actualización de Datos',
        registerNumber: '9876543210987',
        Date: '2023-10-02',
        procedureType: 'Modificación',
        catastroStatus: CatastroStatuses.Rechazado
    },
    {
        operation: 'Cierre de Establecimiento',
        registerNumber: '4567891234567',
        Date: '2023-10-03',
        procedureType: 'Cierre',
        catastroStatus: CatastroStatuses.Rechazado
    },
    {
        operation: 'Renovación de Licencia',
        registerNumber: '3216549873210',
        Date: '2023-10-04',
        procedureType: 'Renovación',
        catastroStatus: CatastroStatuses.Ratificado
    }
];

export interface AssignmentHistoryModel {
    assignmentDate: string;
    queue: string;
    observations: string;
}

export const assignmentsHistory: AssignmentHistoryModel[] = [
    {
        assignmentDate: '2023-10-01',
        queue: 'Revisión Inicial',
        observations: 'Asignado para revisión de apertura.'
    },
    {
        assignmentDate: '2023-10-02',
        queue: 'Validación de Datos',
        observations: 'Datos del establecimiento verificados.'
    },
    {
        assignmentDate: '2023-10-03',
        queue: 'Cierre de Proceso',
        observations: 'Proceso de cierre completado.'
    }
];

export interface InspectionHistoryModel {
    status: string;
    creationDate: string;
    inspectionDate: string;
    queue: string;
    observations: string;
}

export const inspectionsHistory: InspectionHistoryModel[] = [
    {
        status: 'Aprobado',
        creationDate: '2023-10-01',
        inspectionDate: '2023-10-05',
        queue: 'Inspección Inicial',
        observations: 'Inspección realizada con éxito.'
    },
    {
        status: 'En Revisión',
        creationDate: '2023-10-02',
        inspectionDate: '2023-10-06',
        queue: 'Revisión de Documentos',
        observations: 'Documentos en revisión.'
    },
    {
        status: 'Rechazado',
        creationDate: '2023-10-03',
        inspectionDate: '2023-10-07',
        queue: 'Inspección Final',
        observations: 'Inspección no aprobada, se requieren correcciones.'
    }
];
