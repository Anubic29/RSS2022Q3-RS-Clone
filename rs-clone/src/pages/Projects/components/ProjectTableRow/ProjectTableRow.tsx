import { useEffect, useState } from 'react';
import { MdStarOutline } from 'react-icons/md';
import api from '../../../../api';
import { UserAvatar } from '../../../../components';
import UserType from '../../../../types/user/userType';
import { convertLetterToHex } from '../../../../utils/convertLetterToHex';

import styles from './ProjectTableRow.module.scss';

interface ProjectTableRowProps {
  title: string;
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

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        <span className={styles['btn-block']}>
          <MdStarOutline />
        </span>
      </td>
      <td className={styles.cell}>{props.title}</td>
      <td className={styles.cell}>{props.myKey}</td>
      <td className={styles.cell}>{props.description}</td>
      <td className={`${styles.cell} ${styles['user-cell']}`}>
        {user && (
          <>
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
          </>
        )}
      </td>
      <td className={styles.cell}></td>
    </tr>
  );
}

export default ProjectTableRow;
