import React, {useState, useEffect} from "react";
import axios from "axios";
import TaskForm from "../components/taskForm";
import ToDoList from "../components/toDoList";
import NavButtons from "../components/navButtons";
import {navigate} from "@reach/router";
import Moment from "moment";
import Sort from 'sort-objects-array';
import {orderBy} from "natural-orderby";

const ToDoPage = (props)=>{
    const [errors, setErrors] = useState({})
    const [endDate, setEndDate] = useState(false)
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
        setTask(true);
    }

    const sortTaskDesc = (e) =>{
        e.preventDefault();
        let sorted = Sort(tasks, 'name', 'desc');
        setTasks(sorted);
        setTask(false);
    }

    const sortDateDesc =(e)=>{
        e.preventDefault()
        let sorted = orderBy(tasks,
            [v => v.startBy, v => v.completeBy],
            ['desc', "desc"]
        )
        setTasks(sorted);
        setDate(false);
    }

    const sortDateAsc = (e)=>{
        e.preventDefault()
        let sorted = orderBy( tasks,
            [v => v.startBy, v=> v.completeBy],
            ['asc', "asc"]
        )
        setTasks(sorted);
        setDate(true);
    }

    const sortEndDateDesc = (e)=>{
        e.preventDefault()
        let sorted = orderBy(tasks,
            [v=> v.completeBy, v=> v.completeBy],
            ['desc', 'desc']
        )
        setTasks(sorted);
        setEndDate(false);
    }

    const sortEndDateAsc = (e) =>{
        e.preventDefault();
        let sorted = orderBy(tasks,
            [v=> v.completeBy, v=> v.completeBy],
            ['asc', 'asc']
        )
        setTasks(sorted);
        setEndDate(true);
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
            {/* <NavButtons handler={logOut} button1={"LogOut"}  /> */}
            <NavButtons button1={'Back To-Do-List'} button1URL={'/myPlanner'} button2={'Logout'} handler={logOut} />
            <div className="container d-flex justify-content-center">
                <div className={'add-a-task col-md-5 d-inline-block align-top mt-5'}>
                    <h2 style={{color: "black"}}>Add a Task</h2>
                    <br/>
                    <TaskForm taskObj={taskObj} setTaskObj={setTaskObj} addTask={setUpdatedTaskObj} errors={errors} setErrors={setErrors} handler={addTaskHandler} buttonLabel={'Add Task'}/>
                </div>
                <div className={'your-todo-list col-md-7 d-inline-block align-top mt-5'}>
                    <h2 style={{color: "black"}}>Your To-Do List</h2>
                    <br/>
                    <ToDoList toDoList={tasks} endDateSortAsc={sortEndDateAsc} endDateSortDesc={sortEndDateDesc} dateSortDesc={sortDateDesc} dateSortAce={sortDateAsc} prioritySortAce={sortPriorityAce} taskSortAce={sortTaskAce} taskSortDesc={sortTaskDesc} prioritySortDesc={sortPriorityDesc} priority={priority} task={task} date={date} endDate={endDate} setUpdatedTaskObj={setUpdatedTaskObj} handler={deleteTask} />
                </div>
            </div>
        </div>
    )


}

export default ToDoPage;