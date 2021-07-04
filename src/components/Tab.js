import React from 'react';
import '../styles/Tab.css';

function Tab(props) {
  return (
    <div className="Tab">{props.children}</div>
  );
}

export default Tab;
