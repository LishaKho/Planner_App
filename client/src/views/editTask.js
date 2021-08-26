import React, {useState, useEffect} from "react";
import {navigate} from "@reach/router";
import TaskForm from "../components/taskForm";
import NavButtons from "../components/navButtons";
import axios from "axios";
import Moment from "moment";

const EditTask = (props)=>{
    const {id} = props;
    const [errors, setErrors] = useState({});
    const [taskObj, setTaskObj] = useState({
        name: '',
        priority: '',
        description: '',
        startBy: '',
        completeBy: '',

    });


    useEffect(()=>{
        axios.get('http://localhost:8000/api/tasks/' + id,{

            withCredentials: true
        })
            .then((response)=>{
                console.log(response.data);
                setTaskObj(response.data);

            })
            .catch((error)=>{
                console.log(error.response)
                setErrors(errors.response)
            })

    },[id])

    const editTask = (e) =>{
        e.preventDefault();
        console.log('just before request is sent')
        console.log(taskObj)

        if(Moment(taskObj.completeBy).diff(taskObj.startBy) >= 0){
            axios.put('http://localhost:8000/api/tasks/'+ id, taskObj
                ,{
                    withCredentials: true
                })
                .then((response)=>{
                    console.log('in the . then')
                    console.log(response.data);
                    navigate('/myPlanner');
                })
                .catch((error)=>{
                    console.log('error saving task')
                    console.log(error.response);
                })
        } else{
                setErrors({ completeBy:'complete data must be after the start date'});
        }


    }



    return(
        <div>
            {/* <NavButtons button1={'home'} button1URL={'/'} button2={'Register'} button2URL={'/registration'}/> */}
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{backgroundColor: "#9FB1BC", borderRadius: "15px"}}>
                        <div class="card-body p-3">
                            <h1>Edit Task</h1>
                            <TaskForm taskObj={taskObj} setTaskObj={setTaskObj} handler={editTask} setErrors={setErrors} errors={errors} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )



}

export default EditTask