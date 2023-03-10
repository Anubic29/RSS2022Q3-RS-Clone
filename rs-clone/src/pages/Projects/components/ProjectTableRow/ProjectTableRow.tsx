import { useCallback, useMemo, useState } from 'react';
import { MdStar, MdStarOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../../../api';
import { UserAvatar, ProjectAvatar, BtnMenuAction, Preloader } from '../../../../components';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../theme/variables';
import UserType from '../../../../types/user/userType';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';
import { useUser, useProjects } from '../../../../contexts';

import styles from './ProjectTableRow.module.scss';

interface ProjectTableRowProps {
  _id: string;
  title: string;
  projPathImage: string;
  projColor: string;
  myKey: string;
  description: string;
  author: UserType;
  noted: boolean;
  setMainCustomMessage: (text: string) => void;
  setMainLoading: (state: boolean) => void;
  setServerError: (state: boolean) => void;
}

function ProjectTableRow(props: ProjectTableRowProps) {
  const { addNotedItem, setNotedDataBack, setRecentDataBack, deleteNotedItem } = useUser();
  const { deleteProject } = useProjects();
  const [isNoted, setIsNoted] = useState(props.noted);
  const [isLoadingNoted, setIsLoadingNoted] = useState(false);

  const onClickStarHandler = useCallback(async () => {
    if (!isNoted) {
      setIsLoadingNoted(true);
      await addNotedItem(props._id, 'project');
      setIsNoted(true);
      setIsLoadingNoted(false);
    } else {
      setIsLoadingNoted(true);
      await deleteNotedItem(props._id);
      setIsNoted(false);
      setIsLoadingNoted(false);
    }
  }, [props._id, isNoted, addNotedItem, deleteNotedItem]);

  const options = useMemo(() => {
    return [
      {
        title: 'Remove',
        callback: async () => {
          props.setMainLoading(true);
          try {
            await api.tasks.deleteAllDataByProject(props._id);
            if (isNoted) await deleteNotedItem(props._id);
            await deleteProject(props._id);
            setNotedDataBack();
            setRecentDataBack();
          } catch (error) {
            props.setServerError(true);
            props.setMainCustomMessage('Server error');
          } finally {
            props.setMainLoading(false);
          }
        }
      }
    ];
  }, [props._id, deleteProject, setNotedDataBack, setRecentDataBack, isNoted]);

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        <span
          className={isNoted ? `${styles['btn-block']} ${styles['active']}` : styles['btn-block']}
          onClick={onClickStarHandler}>
          {isLoadingNoted ? <Preloader /> : isNoted ? <MdStar /> : <MdStarOutline />}
        </span>
      </td>
      <td className={styles.cell}>
        <Link className={styles['link-block']} to={props._id}>
          <ProjectAvatar
            className={styles['project-icon']}
            source={props.projPathImage}
            bgColor={props.projColor}
            size={30}
          />
          {props.title}
        </Link>
      </td>
      <td className={styles.cell}>{props.myKey}</td>
      <td className={styles.cell}>{props.description}</td>
      <td className={`${styles.cell} ${styles['user-cell']}`}>
        {props.author && (
          <div className={styles['cell-content']}>
            <div className={styles.avatar}>
              <UserAvatar
                content={props.author.firstName[0] + props.author.lastName[0]}
                color={`#${convertLetterToHex(
                  props.author.firstName[0],
                  3,
                  '9'
                )}${convertLetterToHex(props.author.lastName[0], 3, '9')}`}
              />
            </div>
            <div className={styles['user-name']}>
              {props.author.firstName} {props.author.lastName}
            </div>
          </div>
        )}
      </td>
      <td className={`${styles.cell} ${styles['menu-cell']}`}>
        <BtnMenuAction
          options={options}
          btnBackgrColorHover={colorBackgroundHover}
          btnBackgrColorActive={colorSecondaryLight}
        />
      </td>
    </tr>
  );
}

export default ProjectTableRow;
