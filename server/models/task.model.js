const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    name:{
        type: String,
        require: [true, 'A task name is required'],
        minLength: [2,"A task name must be at least 5 characters long" ]
    },

    priority:{
        type: String,
        default: 'routine',

        enum:[
            'extremely high',
            'high',
            'routine',
        ],

    },
    description:{
        type: String,
        require: [false, 'Task Description is not required'],
        maxLength: [255, 'A description must be 255 characters or less']
    },

    startBy:{
      type: Date,
      required: [true, 'Start date is required']
    },

    completeBy:{
        type: Date,
        required: [true, 'Completion date is required']
    },

    isComplete:{
        type: Boolean,
        default: false,
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);