export interface CreateClientRequest {
    // Campos obrigatórios
    brandId: string;           // mapeia para brand_id
    clientType: string;        // mapeia para client_type
    fullName: string;          // mapeia para full_name
    dateOfBirth: string;       // mapeia para date_of_birth
    email: string;
    phone: string;
    
    // Campos opcionais para PF
    cpf?: string;
    
    // Campos opcionais para PJ
    companyName?: string;      // mapeia para company_name
    fantasyName?: string;      // mapeia para fantasy_name
    cnpj?: string;
    stateRegistration?: string; // mapeia para state_registration
    
    // Endereço
    address: {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;        // mapeia para zip_code
        country: string;
    };
    
    // Outros campos opcionais
    telephone?: string;
    enterpriseType?: string;   // mapeia para enterprise_type
    observations?: string;
}

export interface UpdateClientRequest {
    // Todos os campos são opcionais para update
    brandId?: string;           // mapeia para brand_id
    clientType?: string;        // mapeia para client_type
    fullName?: string;          // mapeia para full_name
    dateOfBirth?: string;       // mapeia para date_of_birth
    email?: string;
    phone?: string;
    
    // Campos opcionais para PF
    cpf?: string;
    
    // Campos opcionais para PJ
    companyName?: string;      // mapeia para company_name
    fantasyName?: string;      // mapeia para fantasy_name
    cnpj?: string;
    stateRegistration?: string; // mapeia para state_registration
    
    // Endereço
    address?: {
        street?: string;
        number?: string;
        complement?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
        zipCode?: string;        // mapeia para zip_code
        country?: string;
    };
    
    // Outros campos opcionais
    telephone?: string;
    enterpriseType?: string;   // mapeia para enterprise_type
    observations?: string;
}

