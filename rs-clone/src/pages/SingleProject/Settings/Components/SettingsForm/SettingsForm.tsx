import { useCallback, useEffect, useState } from 'react';
import { Button, Input, Label, Preloader } from '../../../../../components';
import { useBoard } from '../../../../../contexts/Board.context';
import { MdDone } from 'react-icons/md';

import styles from './SettingsForm.module.scss';

enum InputIds {
  NAME = 'name',
  DESCRIPTION = 'description',
  KEY = 'key'
}

function SettingsForm() {
  const { projectInfo, updateProject } = useBoard();
  const [name, setName] = useState('Project name');
  const [description, setDescription] = useState('Project description');
  const [key, setKey] = useState('PNP');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  useEffect(() => {
    setName(projectInfo?.title ?? '');
    setDescription(projectInfo?.description ?? '');
    setKey(projectInfo?.key ?? '');
  }, [projectInfo]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === InputIds.NAME) {
      setName(value);
    } else if (id === InputIds.DESCRIPTION) {
      setDescription(value);
    } else if (id === InputIds.KEY) {
      setKey(value);
    }

    setIsDisabled(false);
  };

  const onSubmitHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsDisabled(true);
      setIsLoaderGoing(true);
      const answer = await updateProject({ title: name, description, key });
      setIsLoaderGoing(false);
      if (answer) {
        setAfterLoadingIcon(true);
        setTimeout(() => setAfterLoadingIcon(false), 1500);
      }
    },
    [updateProject, name, key, description]
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
