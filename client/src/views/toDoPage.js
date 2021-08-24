import React, {useState, useEffect} from "react";
import axios from "axios";
import TaskForm from "../components/taskForm";
import ToDoList from "../components/toDoList";
import NavButtons from "../components/navButtons";
import {navigate} from "@reach/router";
import Moment from "moment";
import Sort from 'sort-objects-array';

const ToDoPage = (props)=>{
    const [errors, setErrors] = useState({})
    const [date, setDate] = useState(false);
    const [priority, setPriority] = useState(false);
    const [task, setTask] = useState(false);
    const [updatedTaskObj, setUpdatedTaskObj] = useState({});
    const [tasks, setTasks] = useState([]);
    const [taskObj, setTaskObj] = useState({
        name: '',
        priority: 'routine',
        description: '',
        startBy: '',
        completeBy: '',

    })



    const deleteTask = (e, id) =>{
        e.preventDefault();

        axios.delete('http://localhost:8000/api/tasks/' + id, {
            withCredentials: true
        })
            .then((response)=>{
                console.log(response.data);
                setUpdatedTaskObj(response.data);
            })
            .catch((errors)=>{
                console.log(errors.response);
            })
    }

    const sortPriorityAce = (e) =>{
        e.preventDefault();
        let sorted = Sort(tasks, 'priority');
        console.log(sorted);
        setTasks(sorted);
        setPriority(false);
    }

    const sortPriorityDesc = (e) =>{
        e.preventDefault();
        let sorted = Sort(tasks, 'priority', 'desc');
        setTasks(sorted);
        setPriority(true);
    }

    const sortTaskAce = (e) =>{
        e.preventDefault();
        let sorted = Sort(tasks, 'name');
        setTasks(sorted);
        setTask(false);
    }

    const sortTaskDesc = (e) =>{
        e.preventDefault();
        let sorted = Sort(tasks, 'name', 'desc');
        setTasks(sorted);
        setTask(true);
    }

    const sortDateAsc = (e)=>{
        e.preventDefault();
        let sort = Sort(tasks, 'startBy');
        setTasks(sort);
        setDate(false);
    }



    const addTaskHandler = (e)=>{
        e.preventDefault();
        console.log(Moment(taskObj.startBy).isBefore(taskObj.completeBy));
        if(Moment(taskObj.startBy).isBefore(taskObj.completeBy)){

            axios.post('http://localhost:8000/api/tasks', taskObj, {

                withCredentials: true

            })
                .then((response)=>{
                    console.log(response.data);
                    setUpdatedTaskObj(response.data);
                    setTaskObj({
                        name: '',
                        priority: '',
                        description: '',
                        startBy: '',
                        completeBy: '',

                    })
                    setErrors('');

                })

                .catch((error)=>{
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                })
        } else{

            setErrors({ date:'complete data must be after the start date'});
        }
    }

    useEffect(()=>{

        axios.get('http://localhost:8000/api/tasks',{
            withCredentials: true
        })

            .then((response)=>{
                console.log(response.data);
                setTasks(response.data);
            })
            .catch((error)=>{

                console.log(error.response);
            })

    }, [updatedTaskObj])



    const logOut = (e) =>{

        axios.post('http://localhost:8000/api/users/logout',{

        },{
            withCredentials: true

        })
            .then((response)=>{
                console.log(response.data);
                navigate('/')
            })
            .catch((error)=>{
                console.log(error.response);

            })
    }



    return(
        <div>
            <NavButtons button1={'open'} handler2={logOut} button2={'Logout'}/>
            <div className={'d-inline-block align-top mt-5'}>
                <h2>Add a Task</h2>
                <TaskForm taskObj={taskObj} setTaskObj={setTaskObj} addTask={setUpdatedTaskObj} errors={errors} setErrors={setErrors} handler={addTaskHandler} buttonLabel={'Add Task'}/>
            </div>
            <div className={'d-inline-block align-top mt-5'}>
                <h2>Your To-Do List</h2>
                <ToDoList toDoList={tasks} dateSortAce={sortDateAsc} prioritySortAce={sortPriorityAce} taskSortAce={sortTaskAce} taskSortDesc={sortTaskDesc} prioritySortDesc={sortPriorityDesc} priority={priority} task={task} date={date} setUpdatedTaskObj={setUpdatedTaskObj} handler={deleteTask} />
            </div>
        </div>
    )


}

export default ToDoPage;