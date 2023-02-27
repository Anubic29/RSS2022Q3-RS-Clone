import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  colorBackgroundColumn,
  colorBackgroundHover,
  colorSecondaryLight,
  colorStarFilled
} from '../../../theme/variables';
import { UserBtn, SelectPanel, ColumnList, PopupAddUser, UserList } from './components';
import { MdStarOutline, MdSearch, MdPersonAdd, MdDone, MdClose, MdStar } from 'react-icons/md';
import useComponentVisible from '../../../hooks/useComponentVisible/useComponentVisible';

import { useOverlay, useUser, useBoard } from '../../../contexts';
import { Preloader, BtnAction, PartOverlay, Input } from '../../../components';
import { Link } from 'react-router-dom';

import styles from './Board.module.scss';

function Board() {
  const { notedItemList, addNotedItem, deleteNotedItem } = useUser();
  const { projectInfo, updateProject, setSearchInputValue, getUserList } = useBoard();
  const { setChildrenBoard, setIsVisibleBoard } = useOverlay();
  const [boardTitle, setBoardTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isNotedProject, setIsNotedProject] = useState(false);
  const [isLoaderGoingStar, setIsLoaderGoingStar] = useState(false);
  const [userListDisplay, setUserListDisplay] = useState<string[]>([]);
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [afterLoadingIcon, setAfterLoadingIcon] = useState(false);

  useEffect(() => {
    const author = projectInfo?.author;
    const users = [...(projectInfo?.team ?? [])];
    if (author) users.unshift(author);
    setUserListDisplay(users);
  }, [projectInfo, getUserList]);

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

  const optionsGroupSelect = useMemo(() => {
    return [
      { value: '', text: 'No' },
      { value: 'Executor', text: 'Executor' }
    ];
  }, []);

  const refSearchBlock = useRef<HTMLDivElement>(null);
  const refSearchInput = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async () => {
    if (!titleError) {
      setIsInputTitleVisible(false);
      setIsLoaderGoing(true);
      const answer = await updateProject({ boardTitle: boardTitle });
      setIsLoaderGoing(false);
      if (answer) {
        setAfterLoadingIcon(true);
        setTimeout(() => setAfterLoadingIcon(false), 1500);
      }
    }
  };

  useEffect(() => {
    if (!isInputTitleVisible) setBoardTitle(`${projectInfo?.boardTitle}`);
  }, [isInputTitleVisible]);

  const onClickBtnNote = useCallback(async () => {
    if (projectInfo) {
      setIsLoaderGoingStar(true);
      if (!isNotedProject) {
        await addNotedItem(projectInfo._id, 'project');
        setIsNotedProject(true);
      } else {
        await deleteNotedItem(projectInfo._id);
        setIsNotedProject(false);
      }
      setIsLoaderGoingStar(false);
    }
  }, [projectInfo, addNotedItem, deleteNotedItem, isNotedProject]);

  useEffect(() => {
    setIsNotedProject(notedItemList.findIndex((data) => data.id === projectInfo?._id) >= 0);
  }, [notedItemList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles['info-block']}>
        <div className={styles['breadcrumbs-block']}>
          <nav className={styles.breadcrumbs}>
            <ul className={styles['breadcrumbs__list']}>
              <li className={styles['breadcrumbs__item']}>
                <Link className={styles['breadcrumbs__link']} to="/">
                  Homepage
                </Link>
              </li>
              <li className={styles['breadcrumbs__item']}>
                <Link className={styles['breadcrumbs__link']} to="/projects">
                  Projects
                </Link>
              </li>
              <li className={styles['breadcrumbs__item']}>
                <p className={styles['breadcrumbs__link']}>{projectInfo?.key}</p>
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
                    {boardTitle.length >= 31 ? boardTitle.substring(0, 30) + '...' : boardTitle}
                  </span>
                  <span className={styles['form-loader']}>
                    {isLoaderGoing && <Preloader text="" />}
                    {afterLoadingIcon && <MdDone />}
                  </span>
                </span>
              ) : (
                <div className={styles['content']}>
                  <Input
                    className={styles['info__title__form__input']}
                    type="text"
                    autoFocus
                    value={boardTitle}
                    onChange={(event) => {
                      setBoardTitle(event.target.value);
                    }}
                    id="board-input-search"
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
              <div className={styles['btn-block-action']}>
                {!isLoaderGoingStar && (
                  <div onClick={onClickBtnNote}>
                    <BtnAction
                      image={isNotedProject ? MdStar : MdStarOutline}
                      colorImg={isNotedProject ? colorStarFilled : ''}
                      title="Add to the list"
                      backgrColorHover={colorBackgroundColumn}
                      backgrColorActive={colorSecondaryLight}
                    />
                  </div>
                )}
                {isLoaderGoingStar && <Preloader />}
              </div>
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
              <UserList userIdList={userListDisplay} />
              <div className={styles['btn-add-user']}>
                <UserBtn
                  type="btn"
                  title="Add user"
                  content={MdPersonAdd}
                  color="rgb(242, 242, 242)"
                  onClick={() => {
                    setChildrenBoard(<PopupAddUser />);
                    setIsVisibleBoard(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles['command-panel__group-block']}>
            <SelectPanel
              title="Group by: "
              options={optionsGroupSelect}
              setSelectedValue={setSelectedGroup}
            />
          </div>
        </div>
      </div>
      <div className={styles['column-list-block']}>
        <ColumnList group={selectedGroup === 'Executor' ? selectedGroup : ''} />
        <PartOverlay scope={'ColumnList'} />
      </div>
    </div>
  );
}

export default Board;
