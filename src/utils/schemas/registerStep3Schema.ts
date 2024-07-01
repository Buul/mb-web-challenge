import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerStep3Schema = Yup.object().shape({
  password: ValidationRules.Required(),
});
