import React from 'react';
import { Input, Label } from '../../../../components';

import styles from './ProjectForm.module.scss';

interface ProjectFormProps {
  projectName: string;
  projectKey: string;
  projectDescription: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

enum InputIds {
  NAME = 'name',
  DESCRIPTION = 'description',
  KEY = 'key'
}

function ProjectForm(props: ProjectFormProps) {
  const { projectName, projectKey, projectDescription, onChange } = props;

  return (
    <form>
      <fieldset className={styles.Fieldset}>
        <Label text="Name" required />
        <Input
          id={InputIds.NAME}
          name={InputIds.NAME}
          type="text"
          placeholder="Try to use team name or purpose of the project"
          value={projectName}
          onChange={onChange}
        />
      </fieldset>

      <fieldset className={styles.Fieldset}>
        <Label text="Description" required />
        <Input
          id={InputIds.DESCRIPTION}
          name={InputIds.DESCRIPTION}
          type="text"
          placeholder="Describe your project with few words"
          value={projectDescription}
          onChange={onChange}
        />
      </fieldset>

      <fieldset className={styles.Fieldset}>
        <Label text="Key" required />
        <Input
          className={styles.Key}
          id={InputIds.KEY}
          name={InputIds.KEY}
          type="text"
          value={projectKey}
          onChange={onChange}
        />
      </fieldset>
    </form>
  );
}

export default ProjectForm;
