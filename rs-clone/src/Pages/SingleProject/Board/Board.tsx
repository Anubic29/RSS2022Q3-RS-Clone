import { useEffect, useRef, useState, useMemo } from 'react';
import {
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight
} from '../../../theme/variables';
import { BtnAction, BtnMenuAction, UserBtn, SelectPanel, ColumnList } from './components';
import { MdStarOutline, MdSearch, MdPersonAdd, MdDone, MdClose } from 'react-icons/md';

import { convertLetterToHex } from '../../../utils/convertLetterToHex';
import { useBoard } from '../../../contexts/Board.context';

import styles from './Board.module.scss';
import useComponentVisible from '../../../hooks/useComponentVisible/useComponentVisible';

const options = [
  { value: '', text: 'No' },
  { value: 'executor', text: 'Executor' },
  { value: 'tasks', text: 'Tasks' }
];

function Board() {
  const { userList, projectInfo, updateProject, setSearchInputValue } = useBoard();
  const [boardTitle, setBoardTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const {
    ref,
    isComponentVisible: isInputTitleVisible,
    setIsComponentVisible: setIsInputTitleVisible
  } = useComponentVisible(false);

  useEffect(() => {
    setBoardTitle(projectInfo?.boardTitle ?? '');
  }, [projectInfo?.boardTitle]);

  useEffect(() => {
    setSearchInputValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setTitleError(boardTitle.length === 0);
  }, [boardTitle]);

  const optionsBtnMenu = useMemo(() => {
    return [
      {
        title: 'Change',
        callback: () => console.log()
      },
      {
        title: 'Remove',
        callback: () => console.log()
      }
    ];
  }, []);

  const refSearchBlock = useRef<HTMLDivElement>(null);
  const refSearchInput = useRef<HTMLInputElement>(null);

  const onSubmitHandler = () => {
    if (!titleError) {
      updateProject({ boardTitle: boardTitle });
      setIsInputTitleVisible(false);
    }
  };

  useEffect(() => {
    if (!isInputTitleVisible) setBoardTitle(`${projectInfo?.boardTitle}`);
  }, [isInputTitleVisible]);

  return (
    <div className={styles.wrapper}>
      <div className={styles['info-block']}>
        <div className={styles['breadcrumbs-block']}>
          <nav className={styles.breadcrumbs}>
            <ul className={styles['breadcrumbs__list']}>
              <li className={styles['breadcrumbs__item']}>
                <a className={styles['breadcrumbs__link']} href="">
                  Projects
                </a>
              </li>
              <li className={styles['breadcrumbs__item']}>
                <a className={styles['breadcrumbs__link']} href="">
                  Current
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.info}>
          <div className={styles['info__title']}>
            <div ref={ref} className={styles['info__title__form']}>
              {!isInputTitleVisible ? (
                <span className={styles['info__title__form__text-backgr']}>
                  <span
                    className={styles['info__title__form__text']}
                    onClick={() => setIsInputTitleVisible(true)}>
                    {boardTitle.length >= 34 ? boardTitle.substring(0, 33) + '...' : boardTitle}
                  </span>
                </span>
              ) : (
                <div className={styles['content']}>
                  <input
                    className={styles['info__title__form__input']}
                    type="text"
                    autoFocus
                    value={boardTitle}
                    onChange={(event) => {
                      setBoardTitle(event.target.value);
                    }}
                  />
                  {titleError && (
                    <span className={styles['error-message']}>Board title can&apos;t be empty</span>
                  )}
                  <div className={styles['btns-block']}>
                    <div className={styles['btn-block']} onClick={() => onSubmitHandler()}>
                      <BtnAction
                        image={MdDone}
                        backgrColorDefault={colorBackgroundColumn}
                        backgrColorHover={colorBackgroundHover}
                        backgrColorActive={colorSecondaryLight}
                      />
                    </div>
                    <div
                      className={styles['btn-block']}
                      onClick={() => setIsInputTitleVisible(false)}>
                      <BtnAction
                        image={MdClose}
                        backgrColorDefault={colorBackgroundColumn}
                        backgrColorHover={colorBackgroundHover}
                        backgrColorActive={colorSecondaryLight}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles['info__actions']}>
            <div className={styles['actions__list']}>
              <BtnAction
                image={MdStarOutline}
                title="Add to the list"
                backgrColorHover={colorBackgroundColumn}
                backgrColorActive={colorSecondaryLight}
              />
              <BtnMenuAction
                options={optionsBtnMenu}
                btnBackgrColorHover={colorBackgroundColumn}
                btnBackgrColorActive={colorSecondaryLight}
              />
            </div>
          </div>
        </div>
        <div className={styles['command-panel']}>
          <div className={styles['command-panel__users-block']}>
            <div
              ref={refSearchBlock}
              className={styles['command-panel__users-block__search-block']}
              onClick={() => {
                refSearchBlock.current?.classList.add(styles['focus']);
                refSearchInput.current?.focus();
              }}>
              <input
                ref={refSearchInput}
                type="text"
                className={styles['search__input']}
                value={searchValue}
                onBlur={() => refSearchBlock.current?.classList.remove(styles['focus'])}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search..."
              />
              <div className={styles['search__btn']}>
                <MdSearch />
              </div>
            </div>
            <div className={styles['user-list-container']}>
              <div className={styles['user-list']}>
                {projectInfo &&
                  [projectInfo.author, ...projectInfo.team].map((userId) => {
                    const user = userList.find((data) => data._id === userId);
                    if (user) {
                      const colorPart1 = convertLetterToHex(user.firstName[0], 3, '9');
                      const colorPart2 = convertLetterToHex(user.lastName[0], 3, '9');
                      return (
                        <UserBtn
                          key={user._id}
                          type="checkbox"
                          _id={user._id}
                          title={`${user.firstName} ${user.lastName}`}
                          content={user.firstName[0] + user.lastName[0]}
                          color={`#${colorPart1}${colorPart2}`}
                        />
                      );
                    }
                  })}
              </div>
              <div className={styles['btn-add-user']}>
                <UserBtn
                  type="btn"
                  title="Add user"
                  content={MdPersonAdd}
                  color="rgb(242, 242, 242)"
                />
              </div>
            </div>
          </div>
          <div className={styles['command-panel__group-block']}>
            <SelectPanel title="Group by: " options={options} />
          </div>
        </div>
      </div>
      <ColumnList />
    </div>
  );
}

export default Board;
