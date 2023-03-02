import React, { useEffect, useState } from 'react';
import BoxWithShadow from '../../../BoxWithShadow/BoxWithShadow';
import { useUser } from '../../../../contexts';
import classes from './ProfileMenu.module.scss';
import UserIcon from '../../../UserIcon/UserIcon';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts';
import { useNavigate } from 'react-router-dom';

function ProfileMenu(props: { onVisibleHandler: () => void }) {
  const { ...uData } = useUser();
  const { ...authData } = useAuth();

  const [user, setUser] = useState(uData.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(uData.currentUser);
  }, [uData.currentUser, user]);

  const logOutHandler = () => {
    authData.removeTokenData();
    navigate('/');
  };

  const profileHandler = () => {
    props.onVisibleHandler();
    navigate('/profile');
  };

  return (
    <div className={classes.profileMenu_wrap}>
      <BoxWithShadow>
        <div className={classes.profileMenu_inner}>
          <h2>ACCOUNT</h2>
          <div className={`${classes.profileMenu_row} ${classes.profileMenu_row__info}`}>
            {user && (
              <Link to="/profile" onClick={() => props.onVisibleHandler()}>
                <UserIcon userFrst={user?.firstName} userLast={user?.lastName} />
              </Link>
            )}
            <div className={classes.profileMenu_userInfo}>
              <p>{`${user?.firstName} ${user?.lastName}`}</p>
              <p>{`${user?.mail}`}</p>
            </div>
          </div>
          <hr></hr>
          <h2>JIRA</h2>
          <p className={classes.profileMenu_profileWrap} onClick={profileHandler}>
            {/* <Link to="/profile"> */}
            <span>Profile</span>
            {/* </Link> */}
          </p>
          <hr></hr>
          <p
            className={`${classes.profileMenu_row} ${classes.profileMenu_row__logOut}`}
            onClick={() => logOutHandler()}>
            LOG OUT
          </p>
        </div>
        <p></p>
      </BoxWithShadow>
    </div>
  );
}

export default ProfileMenu;
