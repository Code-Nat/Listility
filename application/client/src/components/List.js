import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaShareAlt, FaTrashAlt } from 'react-icons/fa'
import { BsShareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/List'
import ListInfo from './ListInfo'
import AddTask from './AddTask'

import { TiEdit } from 'react-icons/ti'
import { MdDelete, MdEdit } from 'react-icons/md';

import Addtodo from './Addtodo'
import Tasks from './Tasks'
import  Provider  from '../context'

import AppHeader from './AppHeader'
import TaskContainer from './TaskContainer'
import Button from './Button'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ShareModal from './ShareModal';
import DeleteModal from './DeleteModal';

import { updateFilterStatus } from '../slices/todoSlice';
import styles from '../assets/styles/modules/todoItem.module.scss'
import { MotionConfig } from 'framer-motion'
import { motion } from 'framer-motion';

import { deleteTodo, updateTodo } from '../slices/todoSlice';
import toast from 'react-hot-toast';
import UpdateListModal from './UpdateListModal';


const List = ({
  todo,
  _id,
  listTitle,
  createdAt,
}) => {
  const { setEditJob, shareJob, deleteJob } = useAppContext()

  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  // const handleDelete = () => {
  //   dispatch(deleteTodo(todo.id));
  //   toast.success('Todo Deleted Successfully');
  // };

  // const handleDelete = () => {
  //   console.log("The _id is: " + _id)
  //   setDeleteModalOpen(true);
  // }

  const handleUpdate = () => {
    // alert("The ID is: " + _id)
    // alert("The TITLE is: " + listTitle)
    setUpdateModalOpen(true);
  };

  let date = moment(createdAt)
  date = date.format('Do MMM, YYYY')
  return (
    <Wrapper>
      <header>
      <div className={styles.todoActions}>
          <h3 id="listTitle">{listTitle}</h3>
          <div
            id="EditListTitle"
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
        <UpdateListModal
          type="update"
          modalOpen={updateModalOpen}
          setModalOpen={setUpdateModalOpen}
          todo={todo}
        />
        <br/>
        <ListInfo icon={<FaCalendarAlt />} text={date} />
      </header>
      <main>
        <Provider>
          <div>
            <AppHeader/>
            <TaskContainer/>
          </div>
        </Provider>
      </main>
      <footer /*className='content'*/>
        <div className='actions'>
          <span>
            <Button id="ShareListButton" variant="primary" onClick={() => setModalOpen(true)}>
              Share
            </Button>
            <ShareModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}/>
          </span>
          <span>
            {/* <Button id="DeleteListButton" variant="delete" onClick={() => deleteJob(_id)}> */}
            <Button id="DeleteListButton" variant="delete" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
            <DeleteModal type="add" modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} id={_id} title={listTitle}/>
          </span>
        </div>
      </footer>
    </Wrapper>
  )
}

export default List