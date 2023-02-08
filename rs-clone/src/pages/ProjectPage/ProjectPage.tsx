import { useEffect, useRef, useState } from 'react';
import { colorBackgroundColumn, colorSecondaryLight } from '../../theme/variables';
import { BtnAction, BtnMenuAction, UserBtn, SelectPanel, ColumnList } from './components';
import { MdStarOutline, MdSearch, MdPersonAdd } from 'react-icons/md';

import styles from './ProjectPage.module.scss';

// Delete After
import { columnListData, taskListData } from '../../Data/FakeProjectPageData';

const options = [
  { value: '', text: 'No' },
  { value: 'executor', text: 'Executor' },
  { value: 'tasks', text: 'Tasks' }
];

type ColumnType = {
  title: string;
  type: string;
  _id: string;
};

type TaskType = {
  _id: string;
  id: number;
  title: string;
  columnId: string;
};

interface ProjectPageProps {
  title: string;
}

function ProjectPage(props: ProjectPageProps) {
  const [title, setTitle] = useState(props.title);
  const [canEditTitle, setCanEditTitle] = useState(false);

  const [columnList, setColumnList] = useState<ColumnType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  useEffect(() => {
    setColumnList(columnListData);
    setTaskList(taskListData);
  }, []);

  const refSearchBlock = useRef<HTMLDivElement>(null);
  const refSearchInput = useRef<HTMLInputElement>(null);

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
            <form className={styles['info__title__form']} action="">
              {!canEditTitle ? (
                <span className={styles['info__title__form__text-backgr']}>
                  <span
                    className={styles['info__title__form__text']}
                    onClick={() => setCanEditTitle(true)}>
                    {title.length >= 34 ? title.substring(0, 33) + '...' : title}
                  </span>
                </span>
              ) : (
                <input
                  className={styles['info__title__form__input']}
                  type="text"
                  autoFocus
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  onBlur={() => setCanEditTitle(false)}
                />
              )}
            </form>
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
                options={['Change', 'Remove']}
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
                onBlur={() => refSearchBlock.current?.classList.remove(styles['focus'])}
                placeholder="Search..."
              />
              <div className={styles['search__btn']}>
                <MdSearch />
              </div>
            </div>
            <div className={styles['user-list-container']}>
              <div className={styles['user-list']}>
                <UserBtn type="checkbox" title="User 1" content="U1" color="green" />
                <UserBtn type="checkbox" title="User 2" content="U2" color="red" />
                <UserBtn type="checkbox" title="User 3" content="U3" color="yellow" />
                <UserBtn type="checkbox" title="User 4" content="U4" color="blue" />
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
      <ColumnList
        columnList={columnList}
        taskList={taskList}
        setColumnList={(data) => setColumnList(data)}
        setTaskList={(data) => setTaskList(data)}
      />
    </div>
  );
}

export default ProjectPage;
