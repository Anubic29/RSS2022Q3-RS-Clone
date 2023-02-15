import { useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import classes from './DetailsBlock.module.scss';
import Block from './Components/Block';

interface dataType {
  [string: string]: string;
}

const DetailsBlock = () => {
  const data: dataType = {
    Assignee: 'Name Surname',
    Labels: 'None',
    Reporter: 'Name Surname'
  };

  const [pinned, setPinned] = useState<string[]>([]);

  const filterPinnedData = () => {
    const pinnedData: { [string: string]: string } = {};
    for (const item in data) {
      if (pinned.includes(item)) {
        pinnedData[item] = data[item as keyof dataType];
      }
    }
    return pinnedData;
  };

  const filterUnPinnedData = () => {
    const unPinnedData: { [string: string]: string } = {};
    for (const item in data) {
      if (!pinned.includes(item)) {
        unPinnedData[item] = data[item as keyof dataType];
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
        />
      )}
      {pinned.length !== 3 && (
        <Block title="Details" data={filterUnPinnedData} onPin={pinHandler} isPinned={false} />
      )}
    </>
  );
};

export default DetailsBlock;
