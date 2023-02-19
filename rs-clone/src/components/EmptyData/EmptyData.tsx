import { MdAllInbox } from 'react-icons/md';

import './EmptyData.scss';

interface EmptyDataProps {
  text: string;
  color?: string;
  iconSizeInPx?: string;
}

const EMPTY_DATA_INITIAL_VALUES = {
  color: '#6b778c',
  iconSize: '24px'
};

function EmptyData(props: EmptyDataProps) {
  const {
    text,
    color = EMPTY_DATA_INITIAL_VALUES.color,
    iconSizeInPx = EMPTY_DATA_INITIAL_VALUES.iconSize
  } = props;

  return (
    <div className="EmptyData">
      <MdAllInbox color={color} size={iconSizeInPx} />
      <p style={{ color }}>{text}</p>
    </div>
  );
}

export default EmptyData;
