import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerStep2PJSchema = Yup.object().shape({
  corporateName: ValidationRules.Required(),
  cnpj: ValidationRules.CNPJ(),
  openingDate: ValidationRules.DatePast(),
  companyPhone: ValidationRules.Required(),
});
