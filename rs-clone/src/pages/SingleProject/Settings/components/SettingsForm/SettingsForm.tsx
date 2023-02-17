import React, { useState } from 'react';
import { Button, Input, Label } from '../../../../../components';

import styles from './SettingsForm.module.scss';

enum InputIds {
  NAME = 'name',
  DESCRIPTION = 'description',
  KEY = 'key'
}

function SettingsForm() {
  const [name, setName] = useState('Project name');
  const [description, setDescription] = useState('Project description');
  const [key, setKey] = useState('PNP');
  const [isDisabled, setIsDisabled] = useState(true);

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

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

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

      <Button className={styles.Button} type="submit" disabled={isDisabled}>
        Save changes
      </Button>
    </form>
  );
}

export default SettingsForm;
