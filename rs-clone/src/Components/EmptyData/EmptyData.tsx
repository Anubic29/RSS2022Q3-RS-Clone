import { MdAllInbox } from 'react-icons/md';
import './EmptyData.scss';

interface EmptyDataProps {
  text: string;
  color?: string;
  iconSizeInPx?: string;
}

function EmptyData(props: EmptyDataProps) {
  const { text, color = '#6b778c', iconSizeInPx = '24px' } = props;

  return (
    <div className="EmptyData">
      <MdAllInbox color={color} size={iconSizeInPx} />
      <p className="EmptyData-text" style={{ color }}>
        {text}
      </p>
    </div>
  );
}

export default EmptyData;
