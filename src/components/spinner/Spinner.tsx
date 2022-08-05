import { FC } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import './spinner.css';


interface SpinnerProps {
  size?: string
}

export const Spinner: FC<SpinnerProps> = ({ size }) => {
  return (
    <div className="spinner-container">
      <CgSpinnerTwo className={`spinner ${size}`} />
    </div>
  );
};

Spinner.defaultProps = {
  size: 'font-3',
};
