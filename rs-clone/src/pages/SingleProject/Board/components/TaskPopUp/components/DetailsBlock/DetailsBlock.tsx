import { useState, useEffect } from 'react';
import Block from './components/Block';
import type UserType from '../../../../../../../types/user/userType';

interface dataType {
  asignee: string;
  author: string;
  team: UserType[];
  assignToMe: boolean;
}

type fieldsType = {
  asignee: string;
  author: string;
};

const DetailsBlock = (props: dataType) => {
  console.log(props.assignToMe);
  const fields = {
    asignee: props.asignee,
    author: props.author
  };
  const [pinned, setPinned] = useState<string[]>([]);
  const filterPinnedData = () => {
    const pinnedData: { [string: string]: string } = {};
    for (const item in fields) {
      if (pinned.includes(item)) {
        pinnedData[item] = fields[item as keyof fieldsType];
      }
    }
    return pinnedData;
  };

  const filterUnPinnedData = () => {
    const unPinnedData: { [string: string]: string } = {};
    for (const item in fields) {
      if (!pinned.includes(item)) {
        unPinnedData[item] = fields[item as keyof fieldsType];
      }
    }
    return unPinnedData;
  };

  const pinHandler = (pin: string, isPinned: boolean) => {
    if (isPinned) setPinned((pinned) => pinned.concat(pin));
    if (!isPinned) setPinned((pinned) => pinned.filter((el) => el !== pin));
    return isPinned;
  };

  useEffect(() => {
    filterPinnedData();
    filterUnPinnedData();
  }, [pinned]);

  return (
    <>
      {pinned.length > 0 && (
        <Block
          title="Your pinned fields"
          data={filterPinnedData}
          onPin={pinHandler}
          isPinned={true}
          team={props.team}
          assignToMe={props.assignToMe}
        />
      )}
      {pinned.length !== 3 && (
        <Block
          title="Details"
          data={filterUnPinnedData}
          onPin={pinHandler}
          isPinned={false}
          team={props.team}
          assignToMe={props.assignToMe}
        />
      )}
    </>
  );
};

export default DetailsBlock;
