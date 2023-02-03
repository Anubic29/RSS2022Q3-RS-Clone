import React from 'react';

const MenuSpan: React.FC<{ text: string }> = (props) => {
  return <span className="header_menu-text">{props.text}</span>;
};

export default MenuSpan;
