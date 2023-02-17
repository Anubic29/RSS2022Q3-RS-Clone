import { useCallback, useState } from 'react';
import { Button } from '../../../../../components';
import Loader from '../../../../../components/Loader/Loader';
import { useOverlay } from '../../../../../contexts';
import { useBoard } from '../../../../../contexts/Board.context';
import projectBadges from '../../../../../data/projectBadges';

import styles from './ProjectBadgesPopup.module.scss';

function ProjectBadgesPopup() {
  const { setIsVisibleBoard, setChildrenBoard } = useOverlay();
  const { updateProject } = useBoard();
  const [selectedImage, setSelectedImage] = useState<number>();

  const onClickHandler = useCallback(() => {
    setIsVisibleBoard(false);
  }, []);

  const onSubmitHandler = useCallback(async () => {
    if (typeof selectedImage === 'number') {
      setChildrenBoard(<Loader />);
      const pathImage = projectBadges.find((data) => data.id === selectedImage)?.src;
      await updateProject({ pathImage });
      setIsVisibleBoard(false);
    }
  }, [projectBadges, updateProject, selectedImage]);

  return (
    <div className={styles.ProjectBadgesPopup}>
      <p className={styles.Title}>Choose badge</p>

      <ul className={styles.BadgesList}>
        {projectBadges.map((badge) => {
          const className =
            badge.id === selectedImage
              ? `${styles.BadgeItem} ${styles.selected}`
              : styles.BadgeItem;
          return (
            <li className={className} key={badge.id} onClick={() => setSelectedImage(badge.id)}>
              <img className={styles.Badge} src={badge.src} alt="Project badge" />
            </li>
          );
        })}
      </ul>
      <div className={styles.Buttons}>
        <Button onClick={onSubmitHandler}>Choose</Button>
        <Button className={styles.ButtonCancel} onClick={onClickHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ProjectBadgesPopup;
