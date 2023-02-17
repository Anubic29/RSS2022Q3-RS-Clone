import { useCallback, useEffect, useState } from 'react';
import { Button, Input, Label, Preloader } from '../../../../../Components';
import Styles from './SettingsForm.module.scss';
import { useBoard } from '../../../../../contexts/Board.context';
import { MdDone } from 'react-icons/md';

function SettingsForm() {
  const { projectInfo, updateProject } = useBoard();
  const [name, setName] = useState('Project name');
  const [key, setKey] = useState('PNP');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  useEffect(() => {
    setName(projectInfo?.title ?? '');
    setKey(projectInfo?.key ?? '');
  }, [projectInfo]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'name') {
      setName(event.target.value);
    } else {
      setKey(event.target.value);
    }

    setIsDisabled(false);
  };

  const onSubmitHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsDisabled(true);
      setIsLoaderGoing(true);
      const answer = await updateProject({ title: name, key });
      setIsLoaderGoing(false);
      if (answer) {
        setAfterLoadingIcon(true);
        setTimeout(() => setAfterLoadingIcon(false), 1500);
      }
    },
    [updateProject, name, key]
  );

  return (
    <form className={Styles.Form} onSubmit={onSubmitHandler}>
      <fieldset className={Styles.Fieldset}>
        <Label text="Name" />
        <Input
          className={Styles.Input}
          type="text"
          id="name"
          value={name}
          onChange={onChangeHandler}
          minLength={5}
        />
      </fieldset>

      <fieldset className={Styles.Fieldset}>
        <Label text="Key" />
        <Input
          className={Styles.Input}
          type="text"
          id="key"
          value={key}
          onChange={onChangeHandler}
          minLength={3}
          maxLength={3}
        />
      </fieldset>

      <div className={Styles['form-row']}>
        <Button className={Styles.Button} type="submit" disabled={isDisabled}>
          Save changes
        </Button>
        <div className={Styles['form-loader']}>
          {isLoaderGoing && <Preloader text="" />}
          {afterLoadingIcon && <MdDone />}
        </div>
      </div>
    </form>
  );
}

export default SettingsForm;
