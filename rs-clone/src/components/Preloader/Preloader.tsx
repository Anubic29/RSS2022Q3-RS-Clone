import './Preloader.scss';

interface PreloaderProps {
  text?: string;
}

const PRELOADER_HEIGHT = {
  withText: '45px',
  withoutText: '25px'
};

function Preloader(props: PreloaderProps) {
  const { text } = props;

  return (
    <div
      className="Preloader"
      style={{ height: text ? PRELOADER_HEIGHT.withText : PRELOADER_HEIGHT.withoutText }}>
      <span className="Preloader-icon" />
      {text && <span className="Preloader-text">{text}</span>}
    </div>
  );
}

export default Preloader;
