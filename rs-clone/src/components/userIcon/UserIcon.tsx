import React from 'react';

const UserIcon: React.FC<{ user: string }> = (props) => {
  return (
    <div className="header_profile-wrap">
      <div className="header_profile-inner">
        <div className="header_profile-icon">
          <span className="header_profile-name">{props.user}</span>
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
