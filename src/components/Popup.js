import React from 'react';
import Button from './Button';
import '../styles/PopUp.css';

function PopUp(props) {
  return (
    <div className="PopUp">
      <div className="Box">
        <h4>{props.title}</h4>
        <p>{props.message}</p>
        <Button color="var(--color-danger)" onClick={props.confirm}>Confirmar</Button>
        <Button onClick={props.cancel}>Cancelar</Button>
      </div>
    </div>
  );
}

export default PopUp;
