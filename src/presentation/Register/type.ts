export type Form = {
  email?: string;
  person?: 'PF' | 'PJ';
  step: number;
  name?: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  corporateName?: string;
  cnpj?: string;
  openingDate?: string;
  companyPhone?: string;
  password?: string;
};

export type StepPage = {
  form: Form;
  onContinue: (form: Form) => void;
};
