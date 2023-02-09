import { ProjectCard } from '../..';
import { EmptyData } from '../../../../../Components';
import cardsData from '../../../../../Data/FakeProjectCard';
import Styles from './ProjectsList.module.scss';

function ProjectsList() {
  const cardsTestData = [...cardsData];

  return (
    <>
      {cardsTestData.length ? (
        <ul className={Styles.ProjectsList}>
          {cardsTestData.map((card) => {
            return <ProjectCard {...card} key={card.id} />;
          })}
        </ul>
      ) : (
        <div className={Styles.Empty}>
          <EmptyData text="There are no projects" iconSizeInPx="24px" />
        </div>
      )}
    </>
  );
}

export default ProjectsList;
