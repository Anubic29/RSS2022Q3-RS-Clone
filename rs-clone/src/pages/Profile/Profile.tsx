import React, { useEffect } from 'react';

import { useUser } from '../../contexts';
import { useProjects } from '../../contexts';
import classes from './Profile.module.scss';

import Cover from './components/Cover/Cover';
import Avatar from './components/Avatar/Avatar';
import UserInfo from './components/UserInfo/UserInfo';
import TeamProjects from './components/TeamProjects/TeamProjects';
import OwnProjects from './components/OwnProjects/OwnProjects';
import RecentProjects from './components/RecentProjects/RecentProjects';

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
            <h2>Recently viewed projects</h2>
            <div className={classes.profile_recentWrap}>
              <RecentProjects></RecentProjects>
            </div>
            <div className={classes.profile_ownedWrap}>
              <h2>Owned projects</h2>
              <OwnProjects></OwnProjects>
            </div>
            <div className={classes.profile_memberWrap}>
              <h2>Projects as member</h2>
              <TeamProjects></TeamProjects>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
