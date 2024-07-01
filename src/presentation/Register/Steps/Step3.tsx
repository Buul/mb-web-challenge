import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import { Title } from '@/components';
import { Button, Input } from '@/components/Form';
import { registerStep3Schema } from '@/utils/schemas';

import { StepPage } from '../type';

export const Step3: FC<StepPage> = ({ onContinue, form }) => {
  useEffect(() => {
    if (!isEmpty(form)) {
      if (form.password) {
        formik.setFieldValue('password', form.password, true);
        formik.setFieldTouched('password', false);
      }
    }
  }, []);

  const redirect = (step: number) => {
    onContinue({
      password: formik.values.password,
      step,
    });
  };
  const handleSubmit = () => {
    redirect(4);
  };

  const handleBack = () => {
    redirect(2);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerStep3Schema,
  });

  return (
    <>
      <Title>Senha de acesso</Title>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Sua senha"
          fullWidth
          placeholder="Crie uma nova senha"
          value={formik.values.password}
          errorMessage={
            (formik.touched.password && formik.errors.password) || ''
          }
          id="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="flex gap-5">
          <Button
            size="md"
            color="secondary"
            onClick={handleBack}
            type="button"
          >
            Voltar
          </Button>
          <Button fullWidth size="md">
            Continuar
          </Button>
        </div>
      </form>
    </>
  );
};
