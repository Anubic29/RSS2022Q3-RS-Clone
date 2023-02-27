import NotedItemUserType from './notedItemUserType';

type CurrentUserType = {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  notedItems: NotedItemUserType[];
  recentProjects: string[];
  __v: number;
  coverBlock?: string;
  departmentInfo?: string;
  jobTitleInfo?: string;
  locationInfo?: string;
  organizationInfo?: string;
};

export default CurrentUserType;
