import { useCallback, useState } from 'react';
import { Button } from '../../../../../components';
import Loader from '../../../../../components/Loader/Loader';
import { useOverlay } from '../../../../../contexts';
import { useBoard } from '../../../../../contexts/Board.context';
import projectBadges from '../../../../../data/projectBadges';
import Styles from './ProjectBadgesPopup.module.scss';

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
    <div className={Styles.ProjectBadgesPopup}>
      <p className={Styles.Title}>Choose badge</p>
      <ul className={Styles.BadgesList}>
        {projectBadges.map((badge) => {
          const className =
            badge.id === selectedImage
              ? `${Styles.BadgeItem} ${Styles.selected}`
              : Styles.BadgeItem;
          return (
            <li className={className} key={badge.id} onClick={() => setSelectedImage(badge.id)}>
              <img className={Styles.Badge} src={badge.src} alt="Project badge" />
            </li>
          );
        })}
      </ul>
      <div className={Styles.Buttons}>
        <Button onClick={onSubmitHandler}>Choose</Button>
        <Button className={Styles.ButtonCancel} onClick={onClickHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ProjectBadgesPopup;
