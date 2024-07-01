import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import { Title } from '@/components';
import { Button, Input } from '@/components/Form';
import { registerStep2PFSchema } from '@/utils/schemas';

import { StepPage } from '../type';

export const Step2PF: FC<StepPage> = ({ onContinue, form }) => {
  const fillFormik = (key: string, value?: string) => {
    if (value) {
      formik.setFieldValue(key, value);
      formik.setFieldTouched(key, false);
    }
  };

  useEffect(() => {
    if (!isEmpty(form)) {
      fillFormik('name', form.name);
      fillFormik('cpf', form.cpf);
      fillFormik('birthDate', form.birthDate);
      fillFormik('phone', form.phone);
    }
  }, []);

  const redirect = (step: number) => {
    onContinue({
      name: formik.values.name,
      cpf: formik.values.cpf,
      birthDate: formik.values.birthDate,
      phone: formik.values.phone,
      step,
    });
  };
  const handleSubmit = () => {
    redirect(3);
  };

  const handleBack = () => {
    redirect(1);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerStep2PFSchema,
  });

  return (
    <>
      <Title>Pessoal Física</Title>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Nome"
          fullWidth
          placeholder="Digite seu nome"
          value={formik.values.name}
          errorMessage={(formik.touched.name && formik.errors.name) || ''}
          id="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          label="CPF"
          fullWidth
          placeholder="Digite seu cpf"
          value={formik.values.cpf}
          errorMessage={(formik.touched.cpf && formik.errors.cpf) || ''}
          id="cpf"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          mask="cpf"
        />
        <Input
          label="Data de nascimento"
          fullWidth
          placeholder="Digite sua data de nascimento"
          value={formik.values.birthDate}
          errorMessage={
            (formik.touched.birthDate && formik.errors.birthDate) || ''
          }
          id="birthDate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          mask="data"
        />
        <Input
          label="Telefone"
          fullWidth
          placeholder="Digite seu telefone"
          value={formik.values.phone}
          errorMessage={(formik.touched.phone && formik.errors.phone) || ''}
          id="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          mask="cel"
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
