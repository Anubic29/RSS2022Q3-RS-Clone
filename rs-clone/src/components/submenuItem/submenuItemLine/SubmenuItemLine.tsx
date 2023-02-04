import React from 'react';

const SubmenuItemLine: React.FC<{
  title: string;
  src: string;
  article: string;
  project: string;
  bgColor: string;
}> = (props) => {
  return (
    <li className="submenu_line">
      <div
        className="submenu_img-wrap"
        style={{
          backgroundColor: `${props.bgColor}`,
          backgroundImage: `url(${props.src})`
        }}></div>
      <div className="submenu_texts">
        <p className="submenu_item-title">{props.title}</p>
        <div className="submenu_item-details">
          <span className="item-details">{props.article}</span>
          <span className="item-details">{props.project}</span>
        </div>
      </div>
    </li>
  );
};

export default SubmenuItemLine;
