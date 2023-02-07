import { Link } from 'react-router-dom';
import { Button } from '../../Components';
import { InfoCards, ProjectForm } from './Components';
import Styles from './ProjectCreate.module.scss';

function ProjectCreate() {
  return (
    <div className={Styles.ProjectCreate}>
      <div className={Styles.Container}>
        <div className={Styles.Row}>
          <div className={Styles.Col}>
            <h1 className={Styles.Title}>Add information about project</h1>
            <p className={Styles.Subtitle}>You can edit information anytime in project settings</p>
            <ProjectForm />
          </div>
          <div className={Styles.ColRight}>
            <InfoCards />
          </div>
        </div>
        <div className={Styles.RowBottom}>
          <Link to="/">
            <Button className={Styles.ButtonCancel}>Cancel</Button>
          </Link>
          <Button>Create project</Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCreate;
