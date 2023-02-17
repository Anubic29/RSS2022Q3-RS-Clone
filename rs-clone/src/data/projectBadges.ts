import badge_1 from '../assets/project-badges/1.svg';
import badge_2 from '../assets/project-badges/2.svg';
import badge_3 from '../assets/project-badges/3.svg';
import badge_4 from '../assets/project-badges/4.svg';
import badge_5 from '../assets/project-badges/5.svg';
import badge_6 from '../assets/project-badges/6.svg';
import badge_7 from '../assets/project-badges/7.svg';
import badge_8 from '../assets/project-badges/8.svg';
import badge_9 from '../assets/project-badges/9.svg';
import badge_10 from '../assets/project-badges/10.svg';
import badge_11 from '../assets/project-badges/11.svg';
import badge_12 from '../assets/project-badges/12.svg';
import badge_13 from '../assets/project-badges/13.svg';
import badge_14 from '../assets/project-badges/14.svg';
import badge_15 from '../assets/project-badges/15.svg';
import badge_16 from '../assets/project-badges/16.svg';
import badge_17 from '../assets/project-badges/17.svg';
import badge_18 from '../assets/project-badges/18.svg';
import badge_19 from '../assets/project-badges/19.svg';
import badge_20 from '../assets/project-badges/20.svg';
import badge_21 from '../assets/project-badges/21.svg';
import badge_22 from '../assets/project-badges/22.svg';
import badge_23 from '../assets/project-badges/23.svg';
import badge_24 from '../assets/project-badges/24.svg';
import badge_25 from '../assets/project-badges/25.svg';
import badge_26 from '../assets/project-badges/26.svg';

interface ProjectBadge {
  id: number;
  src: string;
  bg: string;
}

const BADGES_BG: Record<string, string> = {
  blue: '#2785ff',
  lightBlue: '#06c7e7',
  purple: '#6556c0',
  orange: '#ff5630',
  yellow: '#ffc400'
};

const projectBadges: readonly ProjectBadge[] = [
  {
    id: 1,
    src: badge_1,
    bg: BADGES_BG.blue
  },
  {
    id: 2,
    src: badge_2,
    bg: BADGES_BG.lightBlue
  },
  {
    id: 3,
    src: badge_3,
    bg: BADGES_BG.purple
  },
  {
    id: 4,
    src: badge_4,
    bg: BADGES_BG.orange
  },
  {
    id: 5,
    src: badge_5,
    bg: BADGES_BG.orange
  },
  {
    id: 6,
    src: badge_6,
    bg: BADGES_BG.purple
  },
  {
    id: 7,
    src: badge_7,
    bg: '#253858'
  },
  {
    id: 8,
    src: badge_8,
    bg: BADGES_BG.purple
  },
  {
    id: 9,
    src: badge_9,
    bg: '#ffc400'
  },
  {
    id: 10,
    src: badge_10,
    bg: BADGES_BG.lightBlue
  },
  {
    id: 11,
    src: badge_11,
    bg: BADGES_BG.lightBlue
  },
  {
    id: 12,
    src: badge_12,
    bg: BADGES_BG.lightBlue
  },
  {
    id: 13,
    src: badge_13,
    bg: BADGES_BG.blue
  },
  {
    id: 14,
    src: badge_14,
    bg: BADGES_BG.orange
  },
  {
    id: 15,
    src: badge_15,
    bg: '#ffc400'
  },
  {
    id: 16,
    src: badge_16,
    bg: BADGES_BG.blue
  },
  {
    id: 17,
    src: badge_17,
    bg: BADGES_BG.blue
  },
  {
    id: 18,
    src: badge_18,
    bg: '#ffc400'
  },
  {
    id: 19,
    src: badge_19,
    bg: BADGES_BG.purple
  },
  {
    id: 20,
    src: badge_20,
    bg: '#ffc400'
  },
  {
    id: 21,
    src: badge_21,
    bg: BADGES_BG.lightBlue
  },
  {
    id: 22,
    src: badge_22,
    bg: BADGES_BG.orange
  },
  {
    id: 23,
    src: badge_23,
    bg: BADGES_BG.orange
  },
  {
    id: 24,
    src: badge_24,
    bg: BADGES_BG.blue
  },
  {
    id: 25,
    src: badge_25,
    bg: BADGES_BG.purple
  },
  {
    id: 26,
    src: badge_26,
    bg: BADGES_BG.lightBlue
  }
];

export default projectBadges;
