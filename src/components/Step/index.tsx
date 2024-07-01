import { FC } from 'react';

type Props = {
  step: number;
  stepLength: number;
};

const renderStep = (step: number) => (
  <span className="text-yellow-500">{step}</span>
);

export const Step: FC<Props> = ({ step, stepLength }) => (
  <div className="flex align-center mb-3">
    <p className="text-lg">
      Etapa {renderStep(step)} de {stepLength}
    </p>
  </div>
);
