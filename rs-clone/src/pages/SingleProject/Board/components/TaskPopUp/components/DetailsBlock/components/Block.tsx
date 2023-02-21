import classes from './Block.module.scss';
import { useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import ListItem from './ListItem';
import type UserType from '../../../../../../../../types/user/userType';

interface Block {
  title: string;
  data: () => { [string: string]: string };
  onPin: (pin: string, isPinned: boolean) => boolean;
  isPinned: boolean;
  team: UserType[];
  assignToMe: boolean;
}

const Block = (props: Block) => {
  const [moreDetails, setMoreDetails] = useState(false);
  const [dataList, setDatalist] = useState(props.data());

  const userName = () => {
    const data = props.team.find(
      (user) => user._id === dataList.asignee || user._id === dataList.author
    );
    return `${data?.firstName} ${data?.lastName}`;
  };

  useEffect(() => {
    setDatalist(props.data());
  }, [props.onPin, props.data]);

  const moreDetailsHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setMoreDetails(moreDetails ? false : true);
  };

  return (
    <div className={classes.taskDetails_detailsBlock}>
      <div className={classes.taskDetails_detailsHeader}>
        <p
          onClick={(e) => moreDetailsHandler(e)}
          className={`${classes.taskDetails_detailsHeaderText} ${
            moreDetails ? classes.taskDetails_detailsHeaderText__active : ''
          }`}>
          <span className={classes.taskDetails_detailsHeaderText__bold}>{props.title}</span>

          <span className={classes.taskDetails_detailsHeaderText__light}>
            {Object.keys(props.data()).join(', ')}
          </span>
          <span
            className={`${classes.taskDetails_detailsArrow} ${
              moreDetails ? classes.taskDetails_detailsArrow__active : ''
            }`}>
            <MdExpandMore />
          </span>
        </p>
        <div className={`${classes.taskDetails_moreDelainsRow}`}>
          <ul className={`${classes.details_listBlock} ${moreDetails ? classes.visible : ''}`}>
            {Object.entries(dataList).map((item) => (
              <ListItem
                key={item[0]}
                title={item[0]}
                type={'name'}
                id={item[1]}
                name={userName()}
                pinned={props.onPin}
                isPinned={props.isPinned}
                assignToMe={props.assignToMe}
                team={props.team}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Block;
