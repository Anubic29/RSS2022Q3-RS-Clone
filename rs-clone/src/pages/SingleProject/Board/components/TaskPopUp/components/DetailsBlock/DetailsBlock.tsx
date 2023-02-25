import { useState, useEffect } from 'react';
import Block from './components/Block';
import type UserType from '../../../../../../../types/user/userType';
import { useComments } from '../../../../../../../contexts/Comments.context';

interface dataType {
  taskId: string;
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
  const fields = {
    asignee: props.asignee,
    author: props.author
  };

  const { setPinnedF, getPinnedF } = useComments();
  const pinnedList = getPinnedF();
  const currentTaskPinned = pinnedList.find((task) => task.taskId === props.taskId);

  const [pinned, setPinned] = useState<string[]>(currentTaskPinned ? currentTaskPinned.fields : []);

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
    const pinnedList = getPinnedF();
    const currentTaskPinned = pinnedList.find((task) => task.taskId === props.taskId);
    if (!currentTaskPinned) setPinnedF({ taskId: props.taskId, fields: pinned });
    if (currentTaskPinned) {
      currentTaskPinned.fields = pinned;
      setPinnedF(currentTaskPinned);
    }
  }, [pinned]);

  return (
    <>
      {pinned.length > 0 && (
        <Block
          taskId={props.taskId}
          title="Your pinned fields"
          data={filterPinnedData}
          onPin={pinHandler}
          isPinned={true}
          team={props.team}
          assignToMe={props.assignToMe}
          author={props.author}
          asignee={props.asignee}
        />
      )}
      {pinned.length !== 3 && (
        <Block
          taskId={props.taskId}
          title="Details"
          data={filterUnPinnedData}
          onPin={pinHandler}
          isPinned={false}
          team={props.team}
          assignToMe={props.assignToMe}
          author={props.author}
          asignee={props.asignee}
        />
      )}
    </>
  );
};

export default DetailsBlock;
