import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects, useUser } from '../../../../../contexts';
import ProjectType from '../../../../../types/project/projectType';
import classes from './RecentProjectsRow.module.scss';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

function RecentProjectRow(props: ProjectType) {
  const { ...uData } = useUser();
  const { ...projData } = useProjects();

  const [user, setUser] = useState(uData.currentUser);
  const [projectsList, setProjectsList] = useState<ProjectType[]>([]);
  const [recentList, setRecentList] = useState(uData.recentList);
  const [isMarked, setIsMarked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setRecentList(uData.recentList);
  }, [uData.currentUser, uData.recentList, recentList]);

  useEffect(() => {
    setUser(uData.currentUser);
  }, [uData.currentUser, user]);

  useEffect(() => {
    setProjectsList(projData.projects);
  }, [projData.projects, projectsList]);

  useEffect(() => {
    setIsMarked(Boolean(uData.notedItemList.find((el) => el.id === props._id)));
  }, [uData.notedItemList, setIsMarked]);

  const onMarkedProjectHandler = (projId: string, val: boolean) => {
    val ? uData.addNotedItem(projId, 'project') : uData.deleteNotedItem(projId);
    setIsMarked(val);
  };

  const closeProjMenuHandler = () => {
    // props.onVisHandler();
    navigate(`/projects/${props._id}/board`);
    window.location.reload();
  };

  return (
    <p
      key={props._id}
      className={classes.profileMenu_profileWrap}
      onClick={() => closeProjMenuHandler()}>
      <img className={classes.projectMenu_img} src={props.pathImage}></img>
      <span className={classes.projectMenu_span}>{props.title}</span>
      {isMarked ? (
        <AiFillStar
          className={classes.starIcon}
          onClick={function (e) {
            e.stopPropagation();
            onMarkedProjectHandler(props._id, false);
          }}
        />
      ) : (
        <AiOutlineStar
          className={classes.starIcon}
          onClick={function (e) {
            e.stopPropagation();
            onMarkedProjectHandler(props._id, true);
          }}
        />
      )}
    </p>
  );
}

export default RecentProjectRow;
