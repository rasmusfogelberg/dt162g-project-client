import './input.css';

const Input: React.FC<any & React.InputHTMLAttributes<HTMLInputElement>> = ({name, label, type, ...rest }) => {
  return (
    <> 
      <label {...rest} htmlFor={name}>{label}</label>
      <input {...rest} name={name} type={type} />
    </>
  );
};

export default Input;