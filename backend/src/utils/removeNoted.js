const User = require('../models/User');

async function removeNoted(notedList, userIdList) {
  let users = [];
  if (userIdList) {
    const tempArr = userIdList.map(async (id) => {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error('Not found user');
      return user;
    });
    users = await Promise.all(tempArr);
  } else users = (await User.find({})).filter((user) => user.notedItems.some((data) => notedList.includes(data.id)));

  const result = {};

  for (let i = 0; i < users.length; i++) {
    result[users[i]._id] = users[i].notedItems.filter((noted) => notedList.includes(noted.id));
    users[i].notedItems = users[i].notedItems.filter((noted) => !notedList.includes(noted.id));
    await users[i].save();
  }

  return result;
}

module.exports = removeNoted;