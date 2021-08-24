import React from "react";
import {Link} from "@reach/router";
import Moment from "moment";
import axios from "axios";


const ToDoList = (props) =>{
    const {toDoList, setUpdatedTaskObj, endDateSortAsc, endDateSortDesc, prioritySortAce, dateSortDesc, prioritySortDesc, task, priority, endDate, taskSortAce, taskSortDesc, date, dateSortAce,  handler} = props;


    const completed = (e, id)=>{
        console.log('input check :' + e.target.checked);
        console.log(id)
        axios.put('http://localhost:8000/api/tasks/' + id,{
            isComplete : e.target.checked
        },{
            withCredentials: true
        })
            .then((response)=>{
                console.log(response.data);
                setUpdatedTaskObj(response.data)

            })
            .catch((error)=>{
                console.log(error.response)
            })
    }

    return(
        <div>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th className={'ms-2 me-2'}>status</th>
                        <th>Priority { priority?
                            <svg onClick={(e)=>prioritySortAce(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path
                                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                            : <svg onClick={(e)=>prioritySortDesc(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path
                                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>


                        }  </th>
                        <th className={'ms-2 me-2'}>Tasks { task?
                            <svg onClick={(e)=>taskSortDesc(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path
                                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                            : <svg onClick={(e)=>taskSortAce(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path
                                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>


                        } </th>
                        <th className={'ms-2 me-2'}>Start Date
                            { date?
                                <svg onClick={(e)=>dateSortDesc(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                                :<svg onClick={(e)=> dateSortAce(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                       className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>


                            }</th>
                        <th className={'ms-2 me-2'}>Complete By
                            { endDate?
                                <svg onClick={(e)=>endDateSortDesc(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                                :<svg onClick={(e)=> endDateSortAsc(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>


                            }</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    toDoList.map((task, index)=>{

                        return(
                            <tr key={index} className={Moment(task.completeBy).diff(task.startBy, 'days') < 3? 'text-danger': 'text-dark' }>
                                <td><input type="checkbox" checked={task.isComplete} onChange={(e)=>completed(e, task._id)}/>
                                </td>
                                <td> {task.isComplete? <del>{task.priority.toUpperCase()}</del>
                                                      : task.priority.toUpperCase()
                                } </td>
                                <td>  {task.isComplete?   <del>{task.name}</del>
                                                      : task.name }
                                </td>
                                <td> {Moment(task.startBy).format('DD-MM-YYYY')} </td>
                                <td>{Moment(task.completeBy).format('DD-MM-YYYY')}</td>
                                <td>  {!task.isComplete? <Link to={'/myPlanner/' + task._id}>Edit</Link>: null } <button className={'btn btn-link'} onClick={(e)=>handler(e,task._id)}>Delete</button> </td>
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