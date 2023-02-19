import ProjectType from './ProjectType';

export type ProjectCreateBody = Pick<
  ProjectType,
  'title' | 'description' | 'author' | 'pathImage' | 'key' | 'color'
>;
