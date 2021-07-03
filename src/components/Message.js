import React from 'react';
import '../styles/Message.css';

function Message(props) {
  return (
    <div className="Message" style={{ backgroundColor: props.color || "var(--color-ok)" }}><span>{props.children}</span></div>
  );
};

export default Message;
