import { useEffect, useMemo, useState } from 'react';
import { MdStarOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../../../api';
import { UserAvatar, ProjectAvatar, BtnMenuAction } from '../../../../components';
import { colorBackgroundHover, colorSecondaryLight } from '../../../../theme/variables';
import UserType from '../../../../types/user/userType';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';

import styles from './ProjectTableRow.module.scss';

interface ProjectTableRowProps {
  _id: string;
  title: string;
  projPathImage: string;
  projColor: string;
  myKey: string;
  description: string;
  author: string;
}

function ProjectTableRow(props: ProjectTableRowProps) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    (async () => {
      const response = await api.users.getData(props.author);
      if (response.status === 200) {
        setUser(response.data);
      }
    })();
  }, [props.author]);

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
        <span className={styles['btn-block']}>
          <MdStarOutline />
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
      <td className={styles.cell}>
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
