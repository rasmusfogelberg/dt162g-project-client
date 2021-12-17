import React from "react";
import ReactDOM from "react-dom";

import './modal.css';

import Button from "../Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface ModalProps {
  opened: boolean;
  close: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const Modal: React.FC<ModalProps> = ({ opened, close, children, ...rest }) => {
  const modalClassName = (`${opened ? 'open' : 'closed'}`);

  return ReactDOM.createPortal(
    <>
      <div className={`modalWrapper ${modalClassName}`} {...rest}>
        <Button className="modalCloseButton" style={{ color: 'white' }} onClick={close}>
          <FontAwesomeIcon icon={solid("times")} color="white" />
        </Button>
        <div className="modalContent">
          {children}
        </div>
      </div>
    </>,
    //@ts-ignore
    document.getElementById("modal-root")
  );
};

export default Modal;