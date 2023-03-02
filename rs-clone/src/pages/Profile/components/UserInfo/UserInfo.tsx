import React, { useEffect, useState } from 'react';
import { BiBuildingHouse } from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { MdWorkspacesOutline } from 'react-icons/md';
import { RiBriefcase5Line } from 'react-icons/ri';
import ContourBox from '../../../../components/ContourBox/ContourBox';
import classes from './UserInfo.module.scss';
import { useUser } from '../../../../contexts';
import { BoxWithShadow, EditableParagraph } from '../../../../components';
import UserInfoType from '../../../../types/user/userInfoType';

function UserInfo() {
  const { ...userData } = useUser();
  const [uData, setUserData] = useState(userData.currentUser);

  useEffect(() => {
    setUserData(userData.currentUser);
  }, [userData.currentUser]);

  const changeUserInfoHandler = (
    id: string,
    data: {
      [string: string]: string;
    }
  ) => {
    userData.updateProfileData(id, data);
  };

  return (
    <div className={classes.userInfo_wrap}>
      <h1>{`${uData?.firstName} ${uData?.lastName}`}</h1>
      <ContourBox>
        <div className={classes.profile_userInfo}>
          <ul>
            <h3>Information</h3>
            <li className={classes.userInfo_row}>
              <RiBriefcase5Line className={classes.profile_icon} />
              <EditableParagraph
                id={uData?._id as string}
                titleProp={`${uData?.jobTitleInfo || 'Job name'}`}
                callback={changeUserInfoHandler}
                field="jobTitleInfo"
              />
            </li>
            <li className={classes.userInfo_row}>
              <MdWorkspacesOutline className={classes.profile_icon} />
              <EditableParagraph
                id={uData?._id as string}
                titleProp={`${uData?.departmentInfo || 'Department'}`}
                callback={changeUserInfoHandler}
                field="departmentInfo"
              />
            </li>
            <li className={classes.userInfo_row}>
              <BiBuildingHouse className={classes.profile_icon} />
              <EditableParagraph
                id={uData?._id as string}
                titleProp={`${uData?.organizationInfo || 'Organization'}`}
                callback={changeUserInfoHandler}
                field="organizationInfo"
              />
            </li>
            <li className={classes.userInfo_row}>
              <GiPositionMarker className={classes.profile_icon} />
              <EditableParagraph
                id={uData?._id as string}
                titleProp={`${uData?.locationInfo || 'Location'}`}
                callback={changeUserInfoHandler}
                field="locationInfo"
              />
            </li>
          </ul>
          <h3>Contacts</h3>
          <div className={`${classes.userInfo_row} ${classes.userInfo_email}`}>
            <FaRegEnvelope className={classes.profile_icon} />
            <span>{uData?.mail}</span>
            <div className={classes.userInfo_warning}>
              <BoxWithShadow>
                <p className={classes.userInfo_warning__text}>You can not change email</p>
              </BoxWithShadow>
            </div>
          </div>
        </div>
      </ContourBox>
    </div>
  );
}

export default UserInfo;
