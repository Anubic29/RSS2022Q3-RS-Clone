import React, { useMemo } from 'react';

import RSLogo from '../../assets/icons/rs_logo.svg';
import { AiFillGithub } from 'react-icons/ai';

import styles from './Footer.module.scss';

const Footer = () => {
  const developers = useMemo(
    () => [
      {
        name: 'Alexander Sitailo',
        link: 'https://github.com/Anubic29/'
      },
      {
        name: 'Olena Datso',
        link: 'https://github.com/ElenaDatso'
      },
      {
        name: 'Vlad Antonov',
        link: 'https://github.com/vvant97'
      }
    ],
    []
  );

  return (
    <footer className={styles['footer']}>
      <div className={styles['inner']}>
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img className={styles['logo']} src={RSLogo} alt="RSSchool" />
        </a>
        <div className={styles['developers']}>
          {developers.map((dev, idx) => (
            <a
              key={`dev-${idx}`}
              className={styles['developer']}
              href={dev.link}
              target="_blank"
              rel="noreferrer">
              <AiFillGithub />
              {dev.name}
            </a>
          ))}
          <span className={styles['separator']}>|</span>
          2023
        </div>
      </div>
    </footer>
  );
};

export default Footer;
