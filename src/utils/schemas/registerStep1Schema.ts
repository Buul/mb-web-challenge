import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerStep1Schema = Yup.object().shape({
  email: ValidationRules.Email(),
  person: ValidationRules.Required(),
});
