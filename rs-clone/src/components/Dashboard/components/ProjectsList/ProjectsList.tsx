import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectsList.module.scss';

const cardsTestData = [
  {
    title: 'Project',
    description: 'Drscription',
    size: 23,
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#FF0000'
  },
  {
    title: 'Project 2',
    description: 'Drscription 2',
    size: 23,
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FF00'
  },
  {
    title: 'Project 3',
    description: 'Drscription 3',
    size: 23,
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#0000FF'
  },
  {
    title: 'Project 4',
    description: 'Drscription 4',
    size: 23,
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#FF00FF'
  },
  {
    title: 'Project 5',
    description: 'Drscription 5',
    size: 23,
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FFFF'
  },
  {
    title: 'Project 6',
    description: 'Drscription 6',
    size: 23,
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png',
    bgColor: '#00FF00'
  }
];

function ProjectsList() {
  return (
    <ul className={styles.projectsList}>
      {cardsTestData.map((card, index) => {
        return <ProjectCard {...card} key={index} />;
      })}
    </ul>
  );
}

export default ProjectsList;
