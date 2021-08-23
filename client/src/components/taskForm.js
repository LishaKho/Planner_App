import React from "react";


const TaskForm = (props) =>{
    const {buttonLabel, handler, task, setTask} = props;

    const inputChange = (e) =>{
        console.log('value of ' + e.target.value)

        let newTasksObj = {...task}

        newTasksObj[e.target.name] = e.target.value

        setTask(newTasksObj);

    }

    return(
        <div>
            <form onSubmit={handler}>
                <div className={'form-group'}>
                    <label htmlFor="">Task:</label>
                    <input type="text" name={'name'} className={'form-control'} onChange={(e)=>inputChange(e)}/>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <label htmlFor="">Start Date</label>
                        <input type="date" name={'startBy'} className={'form-control'} onChange={(e)=>inputChange(e)}/>
                    </div>
                    <div className={'col'}>
                        <label htmlFor="">Completed By:</label>
                        <input type="date" name={'completeBy'} className={'form-control'} onChange={(e)=>inputChange(e)}/>
                    </div>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="">Priority:</label>
                    <select name="priority" className={'form-control'} onChange={(e)=>inputChange(e)}>
                        <option value="extremely high">extremely high</option>
                        <option value="high">high</option>
                        <option value="routine">routine</option>
                        <option value="low">low</option>
                    </select>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="">Description</label>
                    <input type="text" name={'description'} className={'form-control'} onChange={(e)=>inputChange(e)}/>
                </div>
                <input type="submit" value={buttonLabel}/>
            </form>
        </div>
    )

}


export default TaskForm;