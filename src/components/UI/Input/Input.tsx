import './input.css';

const Input: React.FC<any & React.InputHTMLAttributes<HTMLInputElement>> = ({name, label, type, ...rest }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} />
    </>
  );
};

export default Input;