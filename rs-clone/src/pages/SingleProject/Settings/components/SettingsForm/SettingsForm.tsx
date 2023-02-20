import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Label, Preloader } from '../../../../../components';
import { useBoard } from '../../../../../contexts/Board.context';
import { MdDone } from 'react-icons/md';
import ProjectType from '../../../../../types/project/projectType';

import styles from './SettingsForm.module.scss';

interface SettingsFormProps {
  imageSrc: string;
  imageBg: string;
}

enum InputIds {
  NAME = 'name',
  DESCRIPTION = 'description',
  KEY = 'key'
}

function SettingsForm(props: SettingsFormProps) {
  const { imageSrc, imageBg } = props;
  const { projectInfo, updateProject } = useBoard();
  const [name, setName] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(projectInfo?.description || '');
  const [key, setKey] = useState(projectInfo?.key || '');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  useEffect(() => {
    const {
      title,
      description: projectDescription,
      key: projectKey,
      pathImage,
      color
    } = projectInfo as ProjectType;

    if (
      title === name &&
      projectDescription === description &&
      projectKey === key &&
      pathImage === imageSrc &&
      color === imageBg
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, description, key, imageSrc, imageBg]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === InputIds.NAME) {
      setName(value);
    } else if (id === InputIds.DESCRIPTION) {
      setDescription(value);
    } else if (id === InputIds.KEY) {
      setKey(value);
    }
  };

  const onSubmitHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      setIsDisabled(true);
      setIsLoaderGoing(true);

      try {
        await updateProject({ title: name, description, key, pathImage: imageSrc, color: imageBg });

        setIsLoaderGoing(false);
        setAfterLoadingIcon(true);
        setTimeout(() => setAfterLoadingIcon(false), 1500);
      } catch {
        console.log(false);
      }
    },
    [updateProject, name, key, description, imageSrc, imageBg]
  );

  return (
    <form className={styles.Form} onSubmit={onSubmitHandler}>
      <fieldset className={styles.Fieldset}>
        <Label text="Name" />
        <Input
          className={styles.Input}
          type="text"
          id={InputIds.NAME}
          value={name}
          onChange={onChangeHandler}
        />
      </fieldset>

      <fieldset className={styles.Fieldset}>
        <Label text="Description" />
        <Input
          className={styles.Input}
          type="text"
          id={InputIds.DESCRIPTION}
          value={description}
          onChange={onChangeHandler}
        />
      </fieldset>

      <fieldset className={styles.Fieldset}>
        <Label text="Key" />
        <Input
          className={styles.Input}
          type="text"
          id={InputIds.KEY}
          value={key}
          onChange={onChangeHandler}
        />
      </fieldset>

      <div className={styles['form-row']}>
        <Button className={styles.Button} type="submit" disabled={isDisabled}>
          Save changes
        </Button>
        <div className={styles['form-loader']}>
          {isLoaderGoing && <Preloader text="" />}
          {afterLoadingIcon && <MdDone />}
        </div>
      </div>
    </form>
  );
}

export default SettingsForm;
