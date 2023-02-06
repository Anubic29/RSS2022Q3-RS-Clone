import Input from '../../Components/Input/Input';
import Label from '../../Components/Label/Label';
import Styles from './ProjectCreate.module.scss';

function ProjectCreate() {
  return (
    <div className={Styles.ProjectCreate}>
      <h1>Create Project Template</h1>
      <Label text="Project name" required htmlFor="project-name" />
      <Input id="project-name" type="text" placeholder="Enter project name here" />
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default ProjectCreate;
