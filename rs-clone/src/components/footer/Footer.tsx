import React from 'react';
import DeveloperItem from './DeveloperItem';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_inner">
        <a
          href="https://rs.school/js/"
          target="_blank"
          className="footer_logo"
          rel="noreferrer"></a>
        <div className="footer_year">2023</div>
        <div className="footer_devs">
          <div className="footer_devs-wrap">
            <DeveloperItem
              href="https://github.com/Anubic29/"
              dev=" Alexander Sitailo"></DeveloperItem>
            <DeveloperItem href="https://github.com/ElenaDatso" dev="Olena Datso"></DeveloperItem>
            <DeveloperItem href="https://github.com/vvant97" dev="Vlad Antonov"></DeveloperItem>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
