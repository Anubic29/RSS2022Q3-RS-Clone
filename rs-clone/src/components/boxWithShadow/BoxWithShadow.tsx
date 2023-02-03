import React from 'react';

const BoxWithShadow: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="submenu_block">
      <div className="submenu_block-inner">{props.children}</div>
    </div>
  );
};

export default BoxWithShadow;
