import React, { useState, useMemo, useCallback } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/store';
import { setOverlayContent } from '../../../../../../../redux/overlaySlice';
import {
  createColumn,
  removeColumn,
  removeTask,
  updateColumn
} from '../../../../../../../redux/projectSlice';
import { BtnMenuAction, EditableText } from '../../../../../../../components';
import { PopupDeleteColumn } from '../../../';

import { MdDone } from 'react-icons/md';

import styles from './ColumnHeader.module.scss';

interface ColumnHeaderProps {
  id: string;
  title: string;
  tasksCount: number;
  stickyHeader?: boolean;
  dragStartHandlerColumn: (event: React.DragEvent, column: string) => void;
  dragEndHandlerColumn: (event: React.DragEvent) => void;
  typeDone?: boolean;
  setIsNewColumnVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ColumnHeader(props: ColumnHeaderProps) {
  const currentProject = useSelector((state: RootState) => state.projectSlice.project);
  const columnList = useSelector((state: RootState) => state.projectSlice.columns);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const [hoverColumnHeader, setHoverColumnHeader] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);

  const optionsBtnMenu = useMemo(() => {
    return [
      {
        title: 'Change Type',
        callback: () => {
          dispatch(
            updateColumn(`${currentProject?._id}`, props.id, {
              type: props.typeDone ? 'common' : 'final'
            })
          );
        }
      },
      {
        title: 'Remove All Tasks',
        callback: () => {
          dispatch(removeTask({ columnId: props.id }));
        }
      },
      {
        title: 'Remove',
        callback: () => {
          if (currentProject) {
            if (props.tasksCount > 0)
              dispatch(setOverlayContent(<PopupDeleteColumn _id={props.id} title={props.title} />));
            else dispatch(removeColumn(currentProject._id, props.id));
          }
        },
        blocked: columnList.length <= 1
      }
    ];
  }, [props.id, props.tasksCount, columnList]);

  const className = useMemo(() => {
    let str = styles['column-header'];
    if (props.stickyHeader) str += ` ${styles['sticky']}`;
    return str;
  }, [props.stickyHeader]);

  const dragConfig = useMemo(() => {
    if (!props.setIsNewColumnVisible && isDraggable) {
      return {
        onDragStart: (event: React.DragEvent<HTMLDivElement>) =>
          props.dragStartHandlerColumn(event, props.id),
        onDragEnd: (event: React.DragEvent<HTMLDivElement>) => props.dragEndHandlerColumn(event),
        draggable: true
      };
    }
    return {};
  }, [
    props.setIsNewColumnVisible,
    props.dragStartHandlerColumn,
    props.dragEndHandlerColumn,
    isDraggable
  ]);

  const onSubmitHandler = useCallback(
    async (value: string) => {
      if (props.setIsNewColumnVisible) {
        dispatch(createColumn(`${currentProject?._id}`, value));
        return true;
      }
      dispatch(updateColumn(`${currentProject?._id}`, props.id, { title: value }));
      return true;
    },
    [props.setIsNewColumnVisible, props.id]
  );

  return (
    <div
      className={className}
      onMouseOver={() => setHoverColumnHeader(true)}
      onMouseOut={() => setHoverColumnHeader(false)}>
      <div className={styles['header-content']} {...dragConfig}>
        <EditableText
          value={props.title}
          onSubmit={(value: string) => onSubmitHandler(value)}
          classNameObj={{
            'form-container': styles['editable-form-container'],
            form: styles['editable-form'],
            text: styles['editable-text']
          }}
          title="Column"
          isActive={!!props.setIsNewColumnVisible}
          onHideEdit={() => {
            setIsDraggable(true);
            if (props.setIsNewColumnVisible) props.setIsNewColumnVisible(false);
          }}
          onVisibleEdit={() => setIsDraggable(false)}
          postText={`${props.tasksCount} tasks`}
          postIcon={
            props.typeDone ? (
              <div className={styles['icon-done']}>
                <MdDone />
              </div>
            ) : undefined
          }
        />
      </div>
      {!props.setIsNewColumnVisible && (isActiveMenu || hoverColumnHeader) && (
        <div className={styles['btn-more']}>
          <BtnMenuAction
            options={optionsBtnMenu}
            btnClassType="first"
            onActiveMenu={(value) => setIsActiveMenu(value)}
          />
        </div>
      )}
    </div>
  );
}

export default ColumnHeader;
