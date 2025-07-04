export interface CreateSaleRequest {
    brandId: string;
    clientId: string;
    originSale?: string;
    seller?: string;
    saleValue: number;
    paymentMethod: string;
    parcelNumber?: number;

    product: {
        brandId: string;
        typeOfColdStorage?: string;
        dimentions?: string;
        capacity?: number;
        observations?: string;
    };

    deliveryDate?: string;
    responsibleForInstallation: string;
    observationsTechnical?: string;
    warrantyTime?: number;
    statusSale?: string;
    calledTechnical?: string;
    observations?: string;
}