import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdStar, MdStarOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../../../api';
import { UserAvatar, ProjectAvatar, BtnMenuAction, Preloader } from '../../../../components';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../theme/variables';
import UserType from '../../../../types/user/userType';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';
import { useUser } from '../../../../contexts';

import styles from './ProjectTableRow.module.scss';

interface ProjectTableRowProps {
  _id: string;
  title: string;
  projPathImage: string;
  projColor: string;
  myKey: string;
  description: string;
  author: string;
  noted: boolean;
}

function ProjectTableRow(props: ProjectTableRowProps) {
  const { addNotedItem, deleteNotedItem } = useUser();
  const [user, setUser] = useState<UserType>();
  const [isNoted, setIsNoted] = useState(props.noted);
  const [isLoadingNoted, setIsLoadingNoted] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.users.getData(props.author);
      if (response.status === 200) {
        setUser(response.data);
      }
    })();
  }, [props.author]);

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
          console.log('Remove:', props._id);
        }
      }
    ];
  }, [props._id]);

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
        {user && (
          <div className={styles['cell-content']}>
            <div className={styles.avatar}>
              <UserAvatar
                content={user.firstName[0] + user.lastName[0]}
                color={`#${convertLetterToHex(user.firstName[0], 3, '9')}${convertLetterToHex(
                  user.lastName[0],
                  3,
                  '9'
                )}`}
              />
            </div>
            <div className={styles['user-name']}>
              {user.firstName} {user.lastName}
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
