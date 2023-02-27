import React, { useEffect } from 'react';
import { RiBriefcase5Line } from 'react-icons/ri';
import { MdWorkspacesOutline } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiPositionMarker } from 'react-icons/gi';
import { FaRegEnvelope } from 'react-icons/fa';

import UserInfoType from '../../types/user/userInfoType';
import UserType from '../../types/user/userType';
import { useUser } from '../../contexts';
import { useProjects } from '../../contexts';
import classes from './Profile.module.scss';

import Cover from './components/Cover/Cover';
import Avatar from './components/Avatar/Avatar';
import ContourBox from '../../components/ContourBox/ContourBox';
import UserInfo from './components/UserInfo/UserInfo';

function Profile() {
  const { currentUser } = useUser();
  const { getProjects } = useProjects();

  useEffect(() => {
    if (currentUser) {
      (async (_id: string) => {
        try {
          await getProjects(_id);
        } catch (e) {
          console.log(e);
        }
      })(currentUser._id);
    }
  }, [currentUser]);
  return (
    <div className={classes.profile_wrap}>
      <Cover />
      <div className={classes.profile_inner}>
        <Avatar letters={`${currentUser?.firstName[0]}${currentUser?.lastName[0]}`} />
        <div className={classes.profile_body}>
          <div className={classes.profile_body__left_col}>
            <UserInfo />
          </div>
          <div className={classes.profile_body__right_col}>
            <h2>Owned projects</h2>
            <ContourBox>
              <div></div>
            </ContourBox>
            <h2>Projects you are working at</h2>
            <ContourBox>
              <div></div>
            </ContourBox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
