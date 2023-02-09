import ProjectType from '../Types/Project/ProjectType';
import TaskType from '../Types/Task/TaskType';

const projectData: ProjectType = {
  _id: '63dbe5ffdcf3ffd695adb4d3',
  title: 'Project_1',
  description: 'common description',
  key: 'P1',
  author: '63daa3099b11296c39649dea',
  team: [],
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
    executor: 'auto',
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
    executor: 'auto',
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
    executor: 'auto',
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
    executor: 'auto',
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
    executor: 'auto',
    projectId: '63dbe5ffdcf3ffd695adb4d3',
    columnId: '63dbe5ffdcf3ffd695adb4d5',
    commentList: [],
    __v: 0
  }
];

export { projectData, taskListData };
