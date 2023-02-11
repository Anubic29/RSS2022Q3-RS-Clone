import UserType from '../Types/User/UserType';
import ProjectType from '../Types/Project/ProjectType';
import TaskType from '../Types/Task/TaskType';

const userListData: UserType[] = [
  {
    _id: '63daa3099b11296c39649dea',
    firstName: 'User',
    lastName: 'Murk',
    __v: 0
  },
  {
    _id: '63dba1bfde4b0f15ce259c6e',
    firstName: 'Randy',
    lastName: 'Cooper',
    __v: 0
  },
  {
    _id: '63dba1cbde4b0f15ce259c71',
    firstName: 'Silver',
    lastName: 'Action',
    __v: 0
  },
  {
    _id: '63dcf19d551e2829cd5fd110',
    firstName: 'Roman',
    lastName: 'Terran',
    __v: 0
  },
  {
    _id: '63e40861c180dbdbe97db805',
    firstName: 'Swarm',
    lastName: 'Bee',
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

const taskListData: TaskType[] = [
  {
    _id: '63dbe5ffdcf3ffd695adb001',
    id: 1,
    title: 'Task 1',
    description: '',
    author: '63daa3099b11296c39649dea',
    executor: '63dcf19d551e2829cd5fd110',
    projectId: '63dbe5ffdcf3ffd695adb4d3',
    columnId: '63dbe5ffdcf3ffd695adb4d4',
    commentList: [],
    __v: 0
  },
  {
    _id: '63dbe5ffdcf3ffd695adb002',
    id: 2,
    title: 'Task 2',
    description: '',
    author: '63daa3099b11296c39649dea',
    executor: '63dba1bfde4b0f15ce259c6e',
    projectId: '63dbe5ffdcf3ffd695adb4d3',
    columnId: '63dbe5ffdcf3ffd695adb4d5',
    commentList: [],
    __v: 0
  },
  {
    _id: '63dbe5ffdcf3ffd695adb003',
    id: 3,
    title: 'Task 3',
    description: '',
    author: '63daa3099b11296c39649dea',
    executor: '63dba1cbde4b0f15ce259c71',
    projectId: '63dbe5ffdcf3ffd695adb4d3',
    columnId: '63dbe5ffdcf3ffd695adb4d4',
    commentList: [],
    __v: 0
  },
  {
    _id: '63dbe5ffdcf3ffd695adb004',
    id: 4,
    title: 'Task 4',
    description: '',
    author: '63daa3099b11296c39649dea',
    executor: '63dcf19d551e2829cd5fd110',
    projectId: '63dbe5ffdcf3ffd695adb4d3',
    columnId: '63dbe6d5dcf3ffd695adb4ea',
    commentList: [],
    __v: 0
  },
  {
    _id: '63dbe5ffdcf3ffd695adb005',
    id: 5,
    title: 'Task 5',
    description: '',
    author: '63daa3099b11296c39649dea',
    executor: '63dba1bfde4b0f15ce259c6e',
    projectId: '63dbe5ffdcf3ffd695adb4d3',
    columnId: '63dbe5ffdcf3ffd695adb4d5',
    commentList: [],
    __v: 0
  }
];

export { userListData, projectData, taskListData };
