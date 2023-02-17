import React from 'react';
import { Input, Label } from '../../../../components';
import Styles from './ProjectForm.module.scss';

interface ProjectFormProps {
  projectName: string;
  projectKey: string;
  projectDescription: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProjectForm(props: ProjectFormProps) {
  const { projectName, projectKey, projectDescription, onChange } = props;

  return (
    <form>
      <fieldset className={Styles.Fieldset}>
        <Label text="Name" required />
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Try to use team name or purpose of the project"
          value={projectName}
          onChange={onChange}
        />
      </fieldset>
      <fieldset className={Styles.Fieldset}>
        <Label text="Description" required />
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Describe your project with few words"
          value={projectDescription}
          onChange={onChange}
        />
      </fieldset>
      <fieldset className={Styles.Fieldset}>
        <Label text="Key" required />
        <Input
          className={Styles.Key}
          id="key"
          name="key"
          type="text"
          value={projectKey}
          onChange={onChange}
        />
      </fieldset>
    </form>
  );
}

export default ProjectForm;
