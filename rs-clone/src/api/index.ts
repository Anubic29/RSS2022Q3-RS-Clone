import instance from './instance';

import recordsModule from './records';
import usersModule from './users';
import authModule from './auth';

export default {
  records: recordsModule(instance),
  users: usersModule(instance),
  auth: authModule(instance)
};
