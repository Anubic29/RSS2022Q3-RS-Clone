import { useState } from 'react';
import { Button, Input, Label } from '../../../../../Components';
import Styles from './SettingsForm.module.scss';

function SettingsForm() {
  const [name, setName] = useState('Project name');
  const [key, setKey] = useState('PNP');
  const [isDisabled, setIsDisabled] = useState(true);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'name') {
      setName(event.target.value);
    } else {
      setKey(event.target.value);
    }

    setIsDisabled(false);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

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

      <Button className={Styles.Button} type="submit" disabled={isDisabled}>
        Save changes
      </Button>
    </form>
  );
}

export default SettingsForm;
