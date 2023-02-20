import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Button } from '../../../../../components';
import { useOverlay } from '../../../../../contexts';
import projectBadges from '../../../../../data/projectBadges';

import styles from './ProjectBadgesPopup.module.scss';

interface ProjectBadgesPopupProps {
  imageSrc: string;
  setImageSrc: Dispatch<SetStateAction<string>>;
  setImageBg: Dispatch<SetStateAction<string>>;
}

function ProjectBadgesPopup(props: ProjectBadgesPopupProps) {
  const { setImageSrc, setImageBg, imageSrc } = props;
  const { setIsVisibleBoard } = useOverlay();
  const [selectedImage, setSelectedImage] = useState(imageSrc);

  const onClickHandler = useCallback(() => {
    setIsVisibleBoard(false);
  }, []);

  const onSubmitHandler = useCallback(async () => {
    const badge = projectBadges.find((data) => data.src === selectedImage);

    if (badge) {
      setImageSrc(badge.src);
      setImageBg(badge.bg);
    }

    setIsVisibleBoard(false);
  }, [projectBadges, selectedImage]);

  return (
    <div className={styles.ProjectBadgesPopup}>
      <p className={styles.Title}>Choose badge</p>

      <ul className={styles.BadgesList}>
        {projectBadges.map((badge) => {
          const className =
            badge.src === selectedImage
              ? `${styles.BadgeItem} ${styles.selected}`
              : styles.BadgeItem;
          return (
            <li className={className} key={badge.id} onClick={() => setSelectedImage(badge.src)}>
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
