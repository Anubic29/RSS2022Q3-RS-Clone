import instance from './instance';

import recordsModule from './records';

export default {
  records: recordsModule(instance)
};
