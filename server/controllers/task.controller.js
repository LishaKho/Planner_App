const Task = require('../models/task.model');
const jwt = require('jsonwebtoken');
// const {update} = require("./task.controller");


module.exports ={

    getAll: (request, response) =>{

        console.log('inside get all');

        Task.find()
            .populate('createdBy', 'username email')
            .then((allTask)=>{

                console.log(allTask);
                response.json(allTask);
            })

            .catch((error)=>{
                console.log(error);
                response.json(error);
            })
    },


    create: (request, response)=>{

        console.log('inside create');
        console.log(request.body);

        const newTaskObj = new Task(request.body);

        const decodedJWT = jwt.decode(request.cookies.userToken, {complete: true});

        newTaskObj.createdBy = decodedJWT.payload.user_id;

        Task.create(newTaskObj)
            .then((newTask)=>{
                console.log(newTask);
                response.json(newTask);
            })
            .catch((error) =>{
                console.log(error);
                response.status(400).json(error);
            })
    },

    getOne: (request, response) =>{
        console.log('inside get one')
        console.log('looking for id: ' + request.params.id);

        Task.findById(request.params.id)
            .populate('createdBy', 'username email')
            .then((oneTask)=>{
                console.log(oneTask);
                response.json(oneTask);
            })
            .catch((error)=>{
                console.log(error);
                response.status(400).json(error);
            })
    },

    update: (request, response) =>{
        console.log('inside update');
        console.log('looking for id ' + request.params.id)
        console.log(request.body);

        Task.findByIdAndUpdate(request.body.id, request.body, {
            new : true,
            runValidators: true
        })

            .then((updatedTask)=>{
                console.log(updatedTask);
                response.json(updatedTask);
            })

            .catch((error)=>{
                console.log(error);
                response.status(400).json(error);
            })
    },

    delete: (request, response) =>{
        console.log('inside delete')
        console.log('looking for id: ' + request.params.id);

        Task.findByIdAndDelete(request.params.id)
            .then((deletedTask) =>{
                console.log(deletedTask);
                response.json(deletedTask);
            })
            .catch((error)=>{
                console.log(error);
                response.status(400).json(error);
            })
    }

}