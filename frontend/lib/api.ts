import type {
  AuthResponse,
  LoginCredentials,
  CreateUserWithProfileTaxpayer,
  Vehicle,
  Taxpayer,
  Catalog,
  PropertyCertificate,
  VehicleRegistration,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  // Users
  async createTaxpayer(
    data: CreateUserWithProfileTaxpayer
  ): Promise<Taxpayer> {
    return this.request<Taxpayer>("/users/taxpayers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAllUsers(): Promise<Taxpayer[]> {
    return this.request<Taxpayer[]>("/users");
  }

  async getAllProfilesTaxpayers(): Promise<Taxpayer[]> {
    return this.request<Taxpayer[]>("/users/profiles-taxpayers");
  }

  async getProfileTaxpayerByNIT(nit: string): Promise<Taxpayer> {
    return this.request<Taxpayer>(`/users/profiles-taxpayers/${nit}`);
  }

  async updateTaxpayer(
    id: number,
    data: Partial<CreateUserWithProfileTaxpayer>
  ): Promise<Taxpayer> {
    return this.request<Taxpayer>(`/users/taxpayers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: number): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: "DELETE",
    });
  }

  // Vehicles
  async getAllVehicles(): Promise<Vehicle[]> {
    return this.request<Vehicle[]>("/vehicles");
  }

  async getVehicleByPlaca(placa: string): Promise<Vehicle> {
    return this.request<Vehicle>(`/vehicles/${placa}`);
  }

  async createVehicle(data: Partial<Vehicle> & {
    nit?: string;
    codigoISCV?: string;
    propertyCertificate: Partial<PropertyCertificate>;
    vehicleRegistration: Partial<VehicleRegistration>;
  }): Promise<Vehicle> {
    return this.request<Vehicle>("/vehicles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateVehicle(
    placa: string,
    data: Partial<Vehicle>
  ): Promise<Vehicle> {
    return this.request<Vehicle>(`/vehicles/${placa}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async inactivateVehicle(placa: string): Promise<Vehicle> {
    return this.request<Vehicle>(`/vehicles/${placa}/inactivar`, {
      method: "PATCH",
    });
  }

  async getPropertyCertificate(placa: string): Promise<PropertyCertificate> {
    return this.request<PropertyCertificate>(
      `/vehicles/${placa}/property-certificate`
    );
  }

  async getVehicleRegistration(placa: string): Promise<VehicleRegistration> {
    return this.request<VehicleRegistration>(
      `/vehicles/${placa}/vehicle-registration`
    );
  }

  async generateCalcomania(placa: string): Promise<unknown> {
    return this.request(`/vehicles/${placa}/calcomania`, {
      method: "POST",
    });
  }

  async pagarCalcomania(placa: string): Promise<unknown> {
    return this.request(`/vehicles/${placa}/calcomania/pagar`, {
      method: "POST",
    });
  }

  // Catalogs
  async getAllCatalogs(): Promise<Catalog[]> {
    return this.request<Catalog[]>("/catalogs");
  }

  async getCatalogByCode(codigoISCV: string): Promise<Catalog> {
    return this.request<Catalog>(`/catalogs/${codigoISCV}`);
  }

  async createCatalog(data: Partial<Catalog>): Promise<Catalog> {
    return this.request<Catalog>("/catalogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCatalog(
    codigoISCV: string,
    data: Partial<Catalog>
  ): Promise<Catalog> {
    return this.request<Catalog>(`/catalogs/${codigoISCV}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteCatalog(codigoISCV: string): Promise<void> {
    return this.request<void>(`/catalogs/${codigoISCV}`, {
      method: "DELETE",
    });
  }

  // PDF Downloads
  async downloadPropertyCertificatePdf(placa: string): Promise<void> {
    const token = this.getToken();
    const response = await fetch(
      `${API_BASE_URL}/vehicles/${placa}/property-certificate/pdf`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      throw new Error("Error al descargar certificado de propiedad");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificado_Propiedad_${placa}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async downloadVehicleRegistrationPdf(placa: string): Promise<void> {
    const token = this.getToken();
    const response = await fetch(
      `${API_BASE_URL}/vehicles/${placa}/vehicle-registration/pdf`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      throw new Error("Error al descargar tarjeta de circulacion");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Tarjeta_Circulacion_${placa}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async downloadVehicleDecalPdf(placa: string): Promise<void> {
    const token = this.getToken();
    const response = await fetch(
      `${API_BASE_URL}/vehicles/${placa}/calcomania/pdf`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      throw new Error("Error al descargar calcomania");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Calcomania_${placa}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export const api = new ApiClient();
