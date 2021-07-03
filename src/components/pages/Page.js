import React from 'react';
import '../../styles/Page.css';

function Page(props) {
  return (
    <div className="Page">{props.children}</div>
  );
}

export default Page;
