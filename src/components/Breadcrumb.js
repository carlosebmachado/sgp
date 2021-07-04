import React from 'react';
import '../styles/Breadcrumb.css';

function Breadcrumb(props) {
  return (
    <div className="Breadcrumb">
      {props.children}
    </div>
  );
};

export default Breadcrumb;
