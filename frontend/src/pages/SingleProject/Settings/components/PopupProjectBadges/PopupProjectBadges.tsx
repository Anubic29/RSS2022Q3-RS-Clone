import React, { useCallback, useState } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { hideOverlay } from '../../../../../redux/overlaySlice';
import projectBadges from '../../../../../data/projectBadges';
import { Button, Modal } from '../../../../../components';

import styles from './PopupProjectBadges.module.scss';

interface ProjectBadgesPopupProps {
  imageSrc: string;
  setImageSrc: (value: string) => void;
  setImageBg: (value: string) => void;
}

function PopupProjectBadges(props: ProjectBadgesPopupProps) {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const [selectedImage, setSelectedImage] = useState(props.imageSrc);

  const onSubmitHandler = useCallback(() => {
    const badge = projectBadges.find((data) => data.src === selectedImage);

    if (badge) {
      props.setImageSrc(badge.src);
      props.setImageBg(badge.bg);
    }

    dispatch(hideOverlay());
  }, [projectBadges, selectedImage]);

  return (
    <Modal className={styles['popup']}>
      <p className={styles['title']}>Choose badge</p>

      <ul className={styles['badges-list']}>
        {projectBadges.map((badge) => {
          const className =
            badge.src === selectedImage
              ? `${styles['badge-item']} ${styles['selected']}`
              : styles['badge-item'];
          return (
            <li className={className} key={badge.id} onClick={() => setSelectedImage(badge.src)}>
              <img className={styles['badge']} src={badge.src} alt="Project badge" />
            </li>
          );
        })}
      </ul>
      <div className={styles['buttons']}>
        <Button onClick={onSubmitHandler} styleButton="primary">
          Choose
        </Button>
        <Button onClick={() => dispatch(hideOverlay())}>Cancel</Button>
      </div>
    </Modal>
  );
}

export default PopupProjectBadges;
