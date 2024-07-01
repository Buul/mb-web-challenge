import { useState } from 'react';

import { Step } from '@/components';

import { Step1, Step2PF, Step2PJ, Step3, Step4 } from './Steps';
import { Form } from './type';

export const Register = () => {
  const [form, setForm] = useState<Form>({ step: 1 });
  const handleContinue = (formPayload: Form) => {
    setForm({ ...form, ...formPayload });
  };
  return (
    <div className="flex flex-col md:w-2/4">
      <Step step={form.step} stepLength={4} />
      {form.step === 1 && <Step1 onContinue={handleContinue} form={form} />}
      {form.step === 2 && form.person === 'PF' && (
        <Step2PF form={form} onContinue={handleContinue} />
      )}
      {form.step === 2 && form.person === 'PJ' && (
        <Step2PJ onContinue={handleContinue} form={form} />
      )}
      {form.step === 3 && <Step3 onContinue={handleContinue} form={form} />}
      {form.step === 4 && <Step4 onContinue={handleContinue} form={form} />}
    </div>
  );
};
