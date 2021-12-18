import './form.css';

/** 
 * Form component
 *   
 * 
 */

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, onClick, ...rest }) => {
  return <form {...rest}>{children}</form>;
};

export default Form;