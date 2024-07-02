import { FC, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import { Title } from '@/components';
import { Button, Input } from '@/components/Form';
import { createUser } from '@/flux/modules/user/actions';
import { UserRequest } from '@/flux/modules/user/types';
import { useCreateUser } from '@/hook/selectors/userHooks';
import { useAppDispatch } from '@/hook/store';
import { ErrorType, SanitizeError } from '@/models/errors';
import { RequestStatus } from '@/models/iRequest';
import { emptyMask } from '@/utils/formatString';
import { registerStep4Schema } from '@/utils/schemas';

import { StepPage } from '../type';

export const Step4: FC<StepPage> = ({ onContinue, form }) => {
  const dispatch = useAppDispatch();
  const { status, message } = useCreateUser();
  const fillFormik = (key: string, value?: string) => {
    if (value) {
      formik.setFieldValue(key, value);
      formik.setFieldTouched(key, false);
    }
  };

  useEffect(() => {
    if (status === RequestStatus.success) {
      toast.success('Usuário adicionado com sucesso!');
    }
    if (status === RequestStatus.error) {
      if (message === ErrorType.INVALID_CPF) {
        formik.setFieldError('cpf', SanitizeError.INVALID_CPF_MESSAGE);
      }
      if (message === ErrorType.INVALID_CNPJ) {
        formik.setFieldError('cnpj', SanitizeError.INVALID_CNPJ_MESSAGE);
      }
      if (message === ErrorType.INVALID_BIRTHDATE) {
        formik.setFieldError('birthDate', SanitizeError.INVALID_DATE_MESSAGE);
      }
      if (message === ErrorType.INVALID_ORIGINDATE) {
        formik.setFieldError('originDate', SanitizeError.INVALID_DATE_MESSAGE);
      }
      if (message === ErrorType.INVALID_EMAIL) {
        formik.setFieldError('email', SanitizeError.INVALID_EMAIL_MESSAGE);
      }
      toast.error('Erro ao adicionar o usuário!');
    }
  }, [status]);

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
  const handleSubmit = () => {
    const payload: UserRequest = {
      email: formik.values.email,
      password: formik.values.password,
      person: formik.values.person,
    };

    if (formik.values.person === 'PF') {
      payload.name = formik.values.name;
      payload.cpf = emptyMask(formik.values.cpf);
      payload.birthDate = formik.values.birthDate;
      payload.phone = emptyMask(formik.values.phone);
    } else {
      payload.corporateName = formik.values.corporateName;
      payload.cnpj = emptyMask(formik.values.cnpj);
      payload.openingDate = formik.values.openingDate;
      payload.companyPhone = emptyMask(formik.values.companyPhone);
    }

    dispatch(createUser.request(payload));
  };

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
      person: '',
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
        <Toaster position="bottom-center" reverseOrder={false} />
      </form>
    </>
  );
};
