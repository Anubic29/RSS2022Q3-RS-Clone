import ColumnProjectType from './ColumnProjectType';

type ProjectType = {
  _id: string;
  title: string;
  description: string;
  key: string;
  author: string;
  team: string[];
  columnList: ColumnProjectType[];
  pathImage: string;
  __v: number;
};

export default ProjectType;
