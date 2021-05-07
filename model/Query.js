const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, require: true },
  },
  { timestamps: true }
);

const querySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the course name'],
       
    },

    description: {
        type: String,
        required: [true, 'Please enter a description']
    },

    comment: [commentSchema]

}, {timestamps: true});

const Query = mongoose.model('query', querySchema);
module.exports = Query;