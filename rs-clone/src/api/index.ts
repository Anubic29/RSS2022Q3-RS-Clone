import instance from './instance';

import recordsModule from './records';
import projectsModule from './projects';
import tasksModule from './tasks';
import usersModule from './users';
import authModule from './auth';

export default {
  records: recordsModule(instance),
  projects: projectsModule(instance),
  tasks: tasksModule(instance),
  users: usersModule(instance),
  auth: authModule(instance)
};
