import React from 'react';
import DeveloperItem from './devItem/DeveloperItem';
import classes from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_inner}>
        <a
          href="https://rs.school/js/"
          target="_blank"
          className={classes.footer_logo}
          rel="noreferrer"></a>
        <div className={classes.footer_year}>2023</div>
        <div className={classes.footer_devs}>
          <div className={classes.footer_devsWrap}>
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
