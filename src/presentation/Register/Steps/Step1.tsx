/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import { Title } from '@/components';
import { Button, Input } from '@/components/Form';
import { Radio } from '@/components/Form/Radio';
import { registerStep1Schema } from '@/utils/schemas';

import { StepPage } from '../type';

const radioOptions = [
  {
    label: 'Pessoa física',
    value: 'PF',
  },
  {
    label: 'Pessoa jurídica',
    value: 'PJ',
  },
];

export const Step1: FC<StepPage> = ({ onContinue, form }) => {
  const fillFormik = (key: string, value?: string) => {
    if (value) {
      formik.setFieldValue(key, value);
      formik.setFieldTouched(key, false);
    }
  };

  useEffect(() => {
    if (!isEmpty(form)) {
      fillFormik('email', form.email);
      fillFormik('person', form.person);
    }
  }, []);

  const handleSubmit = () => {
    onContinue({
      email: formik.values.email,
      person: formik.values.person as 'PF' | 'PJ',
      step: 2,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      person: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerStep1Schema,
  });

  return (
    <>
      <Title>Seja bem vindo(a)</Title>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Endereço de e-mail"
          fullWidth
          placeholder="Digite seu email"
          value={formik.values.email}
          errorMessage={(formik.touched.email && formik.errors.email) || ''}
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Radio
          radioOptions={radioOptions}
          value={formik.values.person}
          defaultValue={formik.values.person}
          onValueChange={(value: 'PF' | 'PJ') =>
            formik.setFieldValue('person', value)
          }
          errorMessage={(formik.touched.person && formik.errors.person) || ''}
        />
        <Button fullWidth size="md" type="submit">
          Continuar
        </Button>
      </form>
    </>
  );
};
