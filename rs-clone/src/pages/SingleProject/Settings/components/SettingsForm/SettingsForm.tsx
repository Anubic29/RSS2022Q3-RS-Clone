import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Label, Preloader, UserAvatar } from '../../../../../components';
import { useBoard, useAlerts, useProjects, useUser } from '../../../../../contexts';
import { MdAccountCircle as UserIcon, MdDone } from 'react-icons/md';
import { projectValidationData } from '../../../../../utils';
import ProjectType from '../../../../../types/project/projectType';
import UserType from '../../../../../types/user/userType';
import { convertLetterToHex } from '../../../../../utils/convertLetterToHex';
import { UsersDropdown } from '../index';

import styles from './SettingsForm.module.scss';

interface SettingsFormProps {
  imageSrc: string;
  imageBg: string;
}

enum InputIds {
  NAME = 'name',
  DESCRIPTION = 'description',
  KEY = 'key',
  ADMIN = 'admin'
}

const { NAME_MIN_LENGTH, KEY_LENGTH, DESCRIPTION_MIN_LENGTH, changeKeyInput, checkIsValidInput } =
  projectValidationData;

function SettingsForm(props: SettingsFormProps) {
  const { imageSrc, imageBg } = props;
  const { projectInfo, updateProject, getUserList } = useBoard();
  const { addAlert } = useAlerts();
  const { changeProjectAuthor } = useProjects();
  const { currentUser } = useUser();

  const [name, setName] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(projectInfo?.description || '');
  const [key, setKey] = useState(projectInfo?.key || '');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidKey, setIsValidKey] = useState(true);

  const [author, setAuthor] = useState('');
  const [authorId, setAuthorId] = useState(projectInfo?.author || '');
  const [cachedAuthor, setCachedAuthor] = useState('');
  const [avatarColor, setAvatarColor] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedUser, setSelectedUser] = useState(projectInfo?.author || '');

  useEffect(() => {
    window.addEventListener('click', onUserBlurHandler);

    return () => {
      window.removeEventListener('click', onUserBlurHandler);
    };
  }, []);

  useEffect(() => {
    const projectAuthor = getUserList().find((user) => user._id === authorId) as UserType;
    const colorFirstHalf = convertLetterToHex(projectAuthor.firstName);
    const colorSecondHalf = convertLetterToHex(projectAuthor.lastName);

    setCachedAuthor(`${projectAuthor.firstName} ${projectAuthor.lastName}`);
    setAvatarColor(`#${colorFirstHalf}${colorSecondHalf}`);
  }, [authorId]);

  useEffect(() => {
    const {
      author: projectAuthor,
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
      color === imageBg &&
      authorId === projectAuthor
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, description, key, imageSrc, imageBg, authorId]);

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
          await changeProjectAuthor(projectInfo?._id as string, authorId);
          await updateProject({
            author: authorId,
            title: name,
            description,
            key,
            pathImage: imageSrc,
            color: imageBg
          });

          setAfterLoadingIcon(true);
          setTimeout(() => setAfterLoadingIcon(false), 1500);

          addAlert('Success', 'Project settings was updated successfully');
        } catch {
          addAlert('Error', 'Server error. Unable to update settings. Try again later');
        } finally {
          setIsLoaderGoing(false);
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
    [updateProject, name, key, description, imageSrc, imageBg, authorId, addAlert]
  );

  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const onUserBlurHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest(`.${styles.UserInputContainer}`)) {
      setIsFocused(true);
      setAuthor('');
    } else {
      setIsFocused(false);
    }
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

      <fieldset className={styles.Fieldset}>
        <Label text="Admin" />
        <div className={styles.UserInputContainer}>
          <label htmlFor={InputIds.ADMIN}>
            {currentUser?._id === projectInfo?.author && isFocused ? (
              <UserIcon
                className={[styles.SettingsUserAvatar, styles.SettingsUserIconEmpty].join(' ')}
              />
            ) : (
              <UserAvatar
                className={
                  currentUser?._id === projectInfo?.author
                    ? styles.SettingsUserAvatar
                    : styles.SettingsUserAvatarDisabled
                }
                content={cachedAuthor}
                color={avatarColor}
              />
            )}
          </label>

          <Input
            className={[styles.Input, styles.UserInput].join(' ')}
            type="text"
            id={InputIds.ADMIN}
            value={
              currentUser?._id !== projectInfo?.author
                ? cachedAuthor
                : isFocused
                ? author
                : cachedAuthor
            }
            onChange={onSearchHandler}
            disabled={currentUser?._id !== projectInfo?.author}
          />

          {currentUser?._id === projectInfo?.author && isFocused && (
            <UsersDropdown
              setIsFocused={setIsFocused}
              setAuthor={setCachedAuthor}
              setAuthorId={setAuthorId}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              search={author}
            />
          )}
        </div>
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
