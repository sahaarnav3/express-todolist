const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duedate: Date
})

const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = Tasks;