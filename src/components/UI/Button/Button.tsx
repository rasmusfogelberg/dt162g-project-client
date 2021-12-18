import './button.css';

/** 
 * Button component
 *   
 * 
 */

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[]
  onClick?: (e?: any) => void
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, onClick, ...rest}) => {
  return <button {...rest} onClick={onClick}>{children}</button>;
};

export default Button;