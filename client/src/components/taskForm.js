import React from "react";
import Moment from "moment";


const TaskForm = (props) =>{
    const {buttonLabel, handler, taskObj, setTaskObj, setErrors, errors} = props;

    const inputChange = (e) =>{
        console.log('value of ' + e.target.value)
        console.log('value of ' + e.target.name)

        let newTasksObj = {...taskObj}

        if(Moment(newTasksObj.completeBy).isBefore(newTasksObj.startBy)){
            setErrors({date: 'completion date before start date'})
        }

        newTasksObj[e.target.name] = e.target.value

        setTaskObj(newTasksObj);
        console.log(newTasksObj);

    }

    return(
        <div>
            <form onSubmit={handler}>
                <div className={'form-group'}>
                    <label htmlFor="">Task:</label><br/>
                    {
                        errors.name? <span className={'text-danger'}>{errors.name.message}</span>: null
                    }
                    <input type="text" name={'name'} value={taskObj.name} className={'form-control'} onChange={(e)=>inputChange(e)}/>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <label htmlFor="">Start Date:</label><br/>
                        {
                            errors.startBy? <span className={'text-danger'}>{errors.startBy.message}</span>: null
                        }
                        {
                            errors.date? <span className={'text-danger'}>{errors.date}</span>: null
                        }
                        <input type="date" name={'startBy'} value={ Moment(taskObj.startBy).format('YYYY-MM-DD') }   className={'form-control'} onChange={(e)=>inputChange(e)}/>
                    </div>
                    <div className={'col'}>
                        <label htmlFor="">Completed By:</label><br/>
                        {
                            errors.completeBy? <span className={'text-danger'}>{errors.completeBy.message}</span>: null
                        }
                        {
                            errors.date? <span className={'text-danger'}>{errors.date}</span>: null
                        }
                        <input type="date" name={'completeBy'} value={Moment(taskObj.completeBy).format('YYYY-MM-DD')}  className={'form-control'} onChange={(e)=>inputChange(e)}/>
                    </div>
                </div>
                <div className={'form-group'} >
                    <label htmlFor="">Priority:</label><br/>
                    {
                        errors.priority? <span className={'text-danger'}>{errors.priority.message}</span>: null
                    }
                    <select name="priority" className={'form-select form-select-mb mb-6'}  value={taskObj.priority.length < 1? 'routine': taskObj.priority} onChange={(e)=>inputChange(e)}>
                        <option value="extremely high">Extremely high</option>
                        <option value="high">High</option>
                        <option value="routine">Routine</option>

                    </select>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="">Description:</label><br/>
                    {
                        errors.description? <span className={'text-danger'}>{errors.description.message}</span>: null
                    }
                    <input type="text" name={'description'} className={'form-control'} value={taskObj.description} onChange={(e)=>inputChange(e)}/>
                </div>
                <input type="submit" value={buttonLabel} style={{ backgroundColor: "#6E8898", color: "white" }}/>
            </form>
        </div>
    )

}


export default TaskForm;