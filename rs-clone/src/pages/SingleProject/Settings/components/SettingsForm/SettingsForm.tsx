import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Label, Preloader } from '../../../../../components';
import { useBoard } from '../../../../../contexts/Board.context';
import { MdDone } from 'react-icons/md';
import { useAlerts } from '../../../../../contexts/AlertsContext';
import { projectValidationData } from '../../../../../utils';
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

const { NAME_MIN_LENGTH, KEY_LENGTH, DESCRIPTION_MIN_LENGTH, changeKeyInput, checkIsValidInput } =
  projectValidationData;

function SettingsForm(props: SettingsFormProps) {
  const { imageSrc, imageBg } = props;
  const { projectInfo, updateProject } = useBoard();
  const { addAlert } = useAlerts();
  const [name, setName] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(projectInfo?.description || '');
  const [key, setKey] = useState(projectInfo?.key || '');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidKey, setIsValidKey] = useState(true);

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
      checkIsValidInput({
        condition: value.length >= NAME_MIN_LENGTH,
        setValidationStateFn: setIsValidName
      });
    } else if (id === InputIds.DESCRIPTION) {
      setDescription(value);
      checkIsValidInput({
        condition: value.length >= DESCRIPTION_MIN_LENGTH,
        setValidationStateFn: setIsValidDescription
      });
    } else if (id === InputIds.KEY) {
      setKey(changeKeyInput(value));
      checkIsValidInput({
        condition: value.length === KEY_LENGTH,
        setValidationStateFn: setIsValidKey
      });
    }
  };

  const onSubmitHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const validationCondition =
        name.length >= NAME_MIN_LENGTH &&
        description.length >= DESCRIPTION_MIN_LENGTH &&
        key.length === KEY_LENGTH;

      if (validationCondition) {
        setIsValidName(true);
        setIsValidDescription(true);
        setIsValidKey(true);

        setIsDisabled(true);
        setIsLoaderGoing(true);

        try {
          await updateProject({
            title: name,
            description,
            key,
            pathImage: imageSrc,
            color: imageBg
          });

          setIsLoaderGoing(false);
          setAfterLoadingIcon(true);
          setTimeout(() => setAfterLoadingIcon(false), 1500);

          addAlert('Success', 'Project settings was updated successfully');
        } catch {
          addAlert('Error', 'Server error. Unable to update settings. Try again later');
        }
      } else {
        checkIsValidInput({
          condition: name.length >= NAME_MIN_LENGTH,
          setValidationStateFn: setIsValidName
        });
        checkIsValidInput({
          condition: description.length >= DESCRIPTION_MIN_LENGTH,
          setValidationStateFn: setIsValidDescription
        });
        checkIsValidInput({
          condition: key.length === KEY_LENGTH,
          setValidationStateFn: setIsValidKey
        });

        addAlert('Error', 'You have to fill form correctly');
      }
    },
    [updateProject, name, key, description, imageSrc, imageBg, addAlert]
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
          isValid={isValidName}
          validationMessage="Name should contain at least 3 characters"
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
          isValid={isValidDescription}
          validationMessage="Description should contain at least 8 characters"
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
          isValid={isValidKey}
          validationMessage="Key should be equal 3 characters"
        />
      </fieldset>

      <div className={styles['form-row']}>
        <Button
          className={styles.Button}
          type="submit"
          disabled={isDisabled}
          title={isDisabled ? 'Settings has no changes' : undefined}>
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
