import './Preloader.scss';

interface PreloaderProps {
  text?: string;
}

function Preloader(props: PreloaderProps) {
  const { text } = props;

  return (
    <div className="Preloader" style={{ height: text ? '45px' : '25px' }}>
      <span className="Preloader-icon" />
      {text && <span className="Preloader-text">{text}</span>}
    </div>
  );
}

export default Preloader;
