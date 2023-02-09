import { useEffect, useRef, useState, useMemo } from 'react';
import ProjectType from '../../Types/Project/ProjectType';
import ColumnProjectType from '../../Types/Project/ColumnProjectType';
import TaskType from '../../Types/Task/TaskType';
import { colorBackgroundColumn, colorSecondaryLight } from '../../theme/variables';
import { BtnAction, BtnMenuAction, UserBtn, SelectPanel, ColumnList } from './components';
import { MdStarOutline, MdSearch, MdPersonAdd } from 'react-icons/md';
import { BoardState } from '../../Context/BoardContext';

import styles from './ProjectPage.module.scss';

// Delete After
import { projectData, taskListData } from '../../Data/FakeProjectPageData';

const options = [
  { value: '', text: 'No' },
  { value: 'executor', text: 'Executor' },
  { value: 'tasks', text: 'Tasks' }
];

interface ProjectPageProps {
  title: string;
}

function ProjectPage(props: ProjectPageProps) {
  const [title, setTitle] = useState(props.title);
  const [canEditTitle, setCanEditTitle] = useState(false);

  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
  const [columnList, setColumnList] = useState<ColumnProjectType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

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

  useEffect(() => {
    setColumnList(projectData.columnList);
    setTaskList(taskListData);
    setProjectInfo(projectData);
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
      <BoardState
        projectId={projectInfo ? projectInfo._id : ''}
        authorId={projectInfo ? projectInfo.author : ''}
        taskList={taskList}
        columnList={columnList}
        setTaskList={(data: TaskType[]) => setTaskList(data)}
        setColumnList={(data: ColumnProjectType[]) => setColumnList(data)}>
        <ColumnList
          columnList={columnList}
          taskList={taskList.sort((a, b) => a.id - b.id)}
          setColumnList={(data) => setColumnList(data)}
          setTaskList={(data) => setTaskList(data)}
        />
      </BoardState>
    </div>
  );
}

export default ProjectPage;
