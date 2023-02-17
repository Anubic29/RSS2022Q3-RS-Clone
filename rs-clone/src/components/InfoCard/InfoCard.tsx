import './InfoCard.scss';

interface InfoCardProps {
  src: string;
  alt: string;
  title: string;
  children: string;
  imgBackground?: string;
}

const InfoCard = (props: InfoCardProps) => {
  const { title, children, src, alt, imgBackground } = props;

  return (
    <div className="InfoCard">
      <div className="InfoCard-picture-container" style={{ backgroundColor: imgBackground }}>
        <img className="InfoCard-picture" src={src} alt={alt} />
      </div>

      <div className="InfoCard-info-container">
        <p className="InfoCard-title">{title}</p>
        <p className="InfoCard-description">{children}</p>
      </div>
    </div>
  );
};

export default InfoCard;
