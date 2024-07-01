import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerStep4Schema = Yup.object().shape({
  password: ValidationRules.Required(),
  email: ValidationRules.Required(),
  person: ValidationRules.Required(),
});
