import React from "react";
import {Link} from "@reach/router";

const ToDoList = (props) =>{
    const {toDoList} = props;


    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Priority</th>
                        <th>status</th>
                        <th>Tasks</th>
                        <th>Start Date</th>
                        <th>Complete By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    toDoList.map((task, index)=>{

                        return(
                            <tr key={index}>
                                <td>{task.priority}</td>
                                <td>{task.isComplete}</td>
                                <td>{task.name}</td>
                                <td>{task.startBy}</td>
                                <td>{task.completeBy}</td>
                                <td> <Link to={'/'}>Edit</Link> <Link to={'/'}>Delete</Link> </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )

}

export default ToDoList;