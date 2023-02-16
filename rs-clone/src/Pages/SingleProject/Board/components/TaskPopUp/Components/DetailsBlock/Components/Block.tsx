import classes from './Block.module.scss';
import { useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import ListItem from './ListItem';

interface Block {
  title: string;
  data: () => { [string: string]: string };
  onPin: (pin: string, isPinned: boolean) => boolean;
  isPinned: boolean;
}

const Block = (props: Block) => {
  const [moreDetails, setMoreDetails] = useState(false);
  const [dataList, setDatalist] = useState(props.data());

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
                type={item[0] === 'Labels' ? 'tags' : 'name'}
                value={item[1]}
                pinned={props.onPin}
                isPinned={props.isPinned}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Block;
