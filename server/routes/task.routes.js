const TaskController = require('../controllers/task.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {

    app.get('/api/tasks', authenticate, TaskController.getAll)
    app.post('/api/tasks', authenticate, TaskController.create)
    app.get('/api/tasks/:id', authenticate, TaskController.getOne)
    app.put('/api/tasks/:id', authenticate, TaskController.update)
    app.delete('/api/tasks/:id', authenticate, TaskController.delete)

}