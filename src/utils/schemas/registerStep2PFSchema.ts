import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerStep2PFSchema = Yup.object().shape({
  name: ValidationRules.Required(),
  cpf: ValidationRules.Cpf(),
  birthDate: ValidationRules.BirthDate(),
  phone: ValidationRules.Required(),
});
