import ProjectType from './projectType';

export type ProjectCreateBody = Pick<
  ProjectType,
  'title' | 'description' | 'author' | 'pathImage' | 'key' | 'color'
>;
