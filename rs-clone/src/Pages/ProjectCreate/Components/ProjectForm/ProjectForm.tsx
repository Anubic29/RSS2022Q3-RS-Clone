import { Input, Label } from '../../../../Components';

import Styles from './ProjectForm.module.scss';

function ProjectForm() {
  return (
    <form>
      <fieldset className={Styles.Fieldset}>
        <Label text="Name" required />
        <Input
          id="project-name"
          type="text"
          placeholder="Try to use team name or purpose of the project"
          required
        />
      </fieldset>
      <fieldset className={Styles.Fieldset}>
        <Label text="Key" required />
        <Input className={Styles.Key} id="project-key" type="text" required />
      </fieldset>
    </form>
  );
}

export default ProjectForm;
