import './input.css';

const Input: React.FC<any & React.InputHTMLAttributes<HTMLInputElement>> = ({name, label, type, ...rest }) => {
  return (
    <> 
      <label {...rest} htmlFor={name}>{label}</label><br />
      <input name={name} type={type} />
    </>
  ); // Should {...rest} be in this one? It wasn't before but why is it called in the Const Input then?
};

export default Input;