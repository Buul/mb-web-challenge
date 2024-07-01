import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import { Title } from '@/components';
import { Button, Input } from '@/components/Form';
import { registerStep2PJSchema } from '@/utils/schemas';

import { StepPage } from '../type';

export const Step2PJ: FC<StepPage> = ({ onContinue, form }) => {
  const fillFormik = (key: string, value?: string) => {
    if (value) {
      formik.setFieldValue(key, value);
      formik.setFieldTouched(key, false);
    }
  };

  useEffect(() => {
    if (!isEmpty(form)) {
      fillFormik('corporateName', form.corporateName);
      fillFormik('cnpj', form.cnpj);
      fillFormik('openingDate', form.openingDate);
      fillFormik('companyPhone', form.companyPhone);
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
    redirect(3);
  };

  const handleBack = () => {
    redirect(1);
  };

  const formik = useFormik({
    initialValues: {
      corporateName: '',
      cnpj: '',
      openingDate: '',
      companyPhone: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerStep2PJSchema,
  });

  return (
    <>
      <Title>Pessoal Jurídica</Title>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Razão social"
          fullWidth
          placeholder="Digite a razão social da empresa"
          value={formik.values.corporateName}
          errorMessage={
            (formik.touched.corporateName && formik.errors.corporateName) || ''
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
            (formik.touched.companyPhone && formik.errors.companyPhone) || ''
          }
          id="companyPhone"
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
