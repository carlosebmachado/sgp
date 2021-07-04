import React from 'react';
import '../styles/Link.css';


function Link(props) {
  return (
    <a
      href={props.href}
      className="Link"
      style={{ backgroundColor: props.color || "var(--color-normal)" }}
    >
      {props.children}
    </a>
  );
};

export default Link;
