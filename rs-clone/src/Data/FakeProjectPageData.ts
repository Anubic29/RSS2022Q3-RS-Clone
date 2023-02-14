import UserType from '../Types/User/UserType';
import ProjectType from '../Types/Project/ProjectType';

const ProjectId = '63dbe5ffdcf3ffd695adb4d3';
const CurrentUserId = '63daa3099b11296c39649dea';

const userListData: UserType[] = [
  {
    _id: '63daa3099b11296c39649dea',
    firstName: 'User',
    lastName: 'Murk',
    mail: 'example@gmail.com',
    __v: 0
  },
  {
    _id: '63dba1bfde4b0f15ce259c6e',
    firstName: 'Randy',
    lastName: 'Cooper',
    mail: 'example123@gmail.com',
    __v: 0
  },
  {
    _id: '63dba1cbde4b0f15ce259c71',
    firstName: 'Silver',
    lastName: 'Action',
    mail: 'example6234@gmail.com',
    __v: 0
  },
  {
    _id: '63dcf19d551e2829cd5fd110',
    firstName: 'Roman',
    lastName: 'Terran',
    mail: 'robF@gmail.com',
    __v: 0
  },
  {
    _id: '63e40861c180dbdbe97db805',
    firstName: 'Swarm',
    lastName: 'Bee',
    mail: 'a@a.net',
    __v: 0
  }
];

const projectData: ProjectType = {
  _id: '63dbe5ffdcf3ffd695adb4d3',
  title: 'Project_1',
  description: 'common description',
  key: 'P1',
  boardTitle: 'Board Project',
  author: '63daa3099b11296c39649dea',
  team: ['63dba1bfde4b0f15ce259c6e', '63dba1cbde4b0f15ce259c71', '63dcf19d551e2829cd5fd110'],
  columnList: [
    {
      title: 'dev',
      type: 'common',
      _id: '63dbe5ffdcf3ffd695adb4d4'
    },
    {
      title: 'exa_column',
      type: 'common',
      _id: '63dbe6d5dcf3ffd695adb4ea'
    },
    {
      title: 'done',
      type: 'final',
      _id: '63dbe5ffdcf3ffd695adb4d5'
    }
  ],
  pathImage: 'src/*.png',
  __v: 2
};

export { userListData, projectData, ProjectId, CurrentUserId };
