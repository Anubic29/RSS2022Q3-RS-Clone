import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../../../contexts';
import { ProjectsContextValue } from '../../../../contexts/ProjectsContext';
import { getCurrentUserId } from '../../../../api/config';
import { getRandomNum } from '../../../../utils';
import { projectBadges } from '../../../../data';
import { Input, Label } from '../../../../components';
import { projectValidationData } from '../../../../utils';

import styles from './ProjectForm.module.scss';

interface ProjectFormProps {
  id: string;
  setLoader: Dispatch<SetStateAction<boolean>>;
}

enum InputIds {
  NAME = 'name',
  DESCRIPTION = 'description',
  KEY = 'key'
}

const BADGE_MIN_INDEX = 0;
const BADGE_MAX_INDEX = 25;
const { NAME_MIN_LENGTH, KEY_LENGTH, DESCRIPTION_MIN_LENGTH, changeKeyInput, checkIsValidInput } =
  projectValidationData;

function ProjectForm(props: ProjectFormProps) {
  const { id, setLoader } = props;

  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');

  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidKey, setIsValidKey] = useState(true);

  const navigate = useNavigate();
  const { createProject } = useProjects() as ProjectsContextValue;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === InputIds.NAME) {
      setName(value);
      checkIsValidInput({
        condition: value.length >= NAME_MIN_LENGTH,
        setValidationStateFn: setIsValidName
      });
    } else if (id === InputIds.KEY) {
      setKey(changeKeyInput(value));
      checkIsValidInput({
        condition: value.length === KEY_LENGTH,
        setValidationStateFn: setIsValidKey
      });
    } else if (id === InputIds.DESCRIPTION) {
      setDescription(value);
      checkIsValidInput({
        condition: value.length >= DESCRIPTION_MIN_LENGTH,
        setValidationStateFn: setIsValidDescription
      });
    }
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationCondition =
      name.length >= NAME_MIN_LENGTH &&
      description.length >= DESCRIPTION_MIN_LENGTH &&
      key.length === KEY_LENGTH;

    if (validationCondition) {
      setLoader(true);

      setIsValidName(true);
      setIsValidDescription(true);
      setIsValidKey(true);

      const userId = await getCurrentUserId();
      const randomNum = getRandomNum(BADGE_MIN_INDEX, BADGE_MAX_INDEX);
      const badge = projectBadges[randomNum];
      const { src, bg } = badge;

      await createProject({
        description,
        key,
        title: name,
        author: userId,
        pathImage: src,
        color: bg
      });

      setLoader(false);
      navigate('/');
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
    }
  };

  return (
    <form id={id} onSubmit={onSubmitHandler}>
      <fieldset className={styles.Fieldset}>
        <Label text="Name" required />
        <Input
          id={InputIds.NAME}
          name={InputIds.NAME}
          type="text"
          placeholder="Try to use team name or purpose of the project"
          value={name}
          onChange={onChangeHandler}
          isValid={isValidName}
          validationMessage="Name should contain at least 3 characters"
        />
      </fieldset>

      <fieldset className={styles.Fieldset}>
        <Label text="Description" required />
        <Input
          id={InputIds.DESCRIPTION}
          name={InputIds.DESCRIPTION}
          type="text"
          placeholder="Describe your project with few words"
          value={description}
          onChange={onChangeHandler}
          isValid={isValidDescription}
          validationMessage="Description should contain at least 8 characters"
        />
      </fieldset>

      <fieldset className={styles.Fieldset}>
        <Label text="Key" required />
        <Input
          className={styles.Key}
          id={InputIds.KEY}
          name={InputIds.KEY}
          type="text"
          value={key}
          onChange={onChangeHandler}
          isValid={isValidKey}
          validationMessage="Key should be equal 3 characters"
        />
      </fieldset>
    </form>
  );
}

export default ProjectForm;
