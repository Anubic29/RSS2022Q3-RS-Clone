import DeveloperItem from './DevItem/DeveloperItem';
import classes from './Footer.module.scss';

import RSLogo from '../../assets/icons/rs_logo.svg';
import React from 'react';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_inner}>
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img className={classes.footer_logo} src={RSLogo} alt="RSSchool" />
        </a>
        <div className={classes.footer_devs}>
          <div className={classes.footer_devsWrap}>
            <DeveloperItem
              href="https://github.com/Anubic29/"
              dev=" Alexander Sitailo"></DeveloperItem>
            <DeveloperItem href="https://github.com/ElenaDatso" dev="Olena Datso"></DeveloperItem>
            <DeveloperItem href="https://github.com/vvant97" dev="Vlad Antonov"></DeveloperItem>
            <span className={classes.Divider}>|</span>
            <div className={classes.footer_year}>2023</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
