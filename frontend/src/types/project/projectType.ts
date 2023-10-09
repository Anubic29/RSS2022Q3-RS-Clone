export type ProjectType = {
  _id: string;
  title: string;
  description: string;
  key: string;
  author: string;
  color: string;
  pathImage: string;
};

export type SingleProjectType = ProjectType & { boardTitle: string };
