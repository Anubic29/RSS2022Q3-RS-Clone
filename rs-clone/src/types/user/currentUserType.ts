import NotedItemUserType from './notedItemUserType';

type CurrentUserType = {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  notedItems: NotedItemUserType[];
  __v: number;
};

export default CurrentUserType;
