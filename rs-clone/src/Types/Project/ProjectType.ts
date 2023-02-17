import ColumnProjectType from './ColumnProjectType';

type ProjectType = {
  _id: string;
  title: string;
  description: string;
  key: string;
  boardTitle: string;
  author: string;
  team: string[];
  color: string;
  columnList: ColumnProjectType[];
  pathImage: string;
  __v: number;
};

export default ProjectType;
