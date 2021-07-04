import React from 'react';
import '../styles/Button.css';

function Link(props) {
  return (
    <a href={props.href} className="Button" style={{ backgroundColor: props.color || "var(--color-normal)" }}>
      {props.children}
    </a>
  );
};

export default Link;
