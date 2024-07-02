export type UserRequest = {
  email: string;
  person: string;
  name?: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  corporateName?: string;
  openingDate?: string;
  companyPhone?: string;
  cnpj?: string;
  originDate?: string;
  password: string;
};

export type Response = {
  success: string;
};

export interface UserResponse {
  data: Response;
}
