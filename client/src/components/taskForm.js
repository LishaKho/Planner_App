import React from "react";


const TaskForm = (props) =>{
    const {buttonLabel, handler, task, setTask} = props;

    const inputChange = (e) =>{
        console.log('value of ' + e.target.name)


    }

}


export default TaskForm;