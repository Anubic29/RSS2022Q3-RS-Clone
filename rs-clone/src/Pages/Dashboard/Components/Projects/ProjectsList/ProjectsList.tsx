import { ProjectCard } from '../..';
import cardsData from '../../../../../Data/FakeProjectCard';
import Styles from './ProjectsList.module.scss';

function ProjectsList() {
  const cardsTestData = [...cardsData];

  return (
    <ul className={Styles.ProjectsList}>
      {cardsTestData.map((card) => {
        return <ProjectCard {...card} key={card.id} />;
      })}
    </ul>
  );
}

export default ProjectsList;
