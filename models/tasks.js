const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
        required: true
    }
})

const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = Tasks;