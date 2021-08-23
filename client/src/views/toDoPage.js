import React, {useState, useEffect} from "react";
import axios from "axios";
import TaskForm from "../components/taskForm";
import ToDoList from "../components/toDoList";

const ToDoPage = (props)=>{
    const [taskObj, setTaskObj] = useState({
        name: '',
        priority: '',
        description: '',
        startBy: '',
        completeBy: '',

    })
    const [tasks, setTasks] = useState([]);


    const addTaskHandler = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/tasks', taskObj, {

            withCredentials: true

        })
            .then((response)=>{
                console.log(response.data);


            })
            .catch((error)=>{
                console.log(error.response);
            })
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
    }, [])


    return(
        <div>
            <div className={'d-inline-block'}>
                <TaskForm task={taskObj} setTask={setTaskObj} handler={addTaskHandler} buttonLabel={'Add Task'}/>
            </div>
            <div className={'d-inline-block'}>
                <ToDoList toDoList={tasks}/>
            </div>
        </div>
    )




}

export default ToDoPage;