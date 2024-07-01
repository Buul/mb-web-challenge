import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import { Title } from '@/components';
import { Button, Input } from '@/components/Form';
import { registerStep4Schema } from '@/utils/schemas';

import { StepPage } from '../type';

export const Step4: FC<StepPage> = ({ onContinue, form }) => {
  const fillFormik = (key: string, value?: string) => {
    if (value) {
      formik.setFieldValue(key, value);
      formik.setFieldTouched(key, false);
    }
  };

  useEffect(() => {
    if (!isEmpty(form)) {
      fillFormik('email', form.email);
      fillFormik('password', form.password);
      fillFormik('person', form.person);
      fillFormik('email', form.email);
      fillFormik('email', form.email);

      if (form.person === 'PF') {
        fillFormik('name', form.name);
        fillFormik('cpf', form.cpf);
        fillFormik('birthDate', form.birthDate);
        fillFormik('phone', form.phone);
      } else {
        fillFormik('corporateName', form.corporateName);
        fillFormik('cnpj', form.cnpj);
        fillFormik('openingDate', form.openingDate);
        fillFormik('companyPhone', form.companyPhone);
      }
    }
  }, []);

  const redirect = (step: number) => {
    onContinue({
      corporateName: formik.values.corporateName,
      cnpj: formik.values.cnpj,
      openingDate: formik.values.openingDate,
      companyPhone: formik.values.companyPhone,
      step,
    });
  };
  const handleSubmit = () => {};

  const handleBack = () => {
    redirect(3);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      corporateName: '',
      cnpj: '',
      openingDate: '',
      companyPhone: '',
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerStep4Schema,
  });

  return (
    <>
      <Title>Revise suas informações</Title>
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
        {form.person === 'PF' && (
          <>
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
          </>
        )}
        {form.person === 'PJ' && (
          <>
            <Input
              label="Razão social"
              fullWidth
              placeholder="Digite a razão social da empresa"
              value={formik.values.corporateName}
              errorMessage={
                (formik.touched.corporateName && formik.errors.corporateName) ||
                ''
              }
              id="corporateName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              label="CNPJ"
              fullWidth
              placeholder="Digite o CNPJ da empresa"
              value={formik.values.cnpj}
              errorMessage={(formik.touched.cnpj && formik.errors.cnpj) || ''}
              id="cnpj"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              mask="cnpj"
            />
            <Input
              label="Data de abertura"
              fullWidth
              placeholder="Digite a data de abertura da empresa"
              value={formik.values.openingDate}
              errorMessage={
                (formik.touched.openingDate && formik.errors.openingDate) || ''
              }
              id="openingDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              mask="data"
            />
            <Input
              label="Telefone"
              fullWidth
              placeholder="Digite o telefone da empresa"
              value={formik.values.companyPhone}
              errorMessage={
                (formik.touched.companyPhone && formik.errors.companyPhone) ||
                ''
              }
              id="companyPhone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              mask="cel"
            />
          </>
        )}
        <Input
          label="Senha"
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
            Cadastrar
          </Button>
        </div>
      </form>
    </>
  );
};
