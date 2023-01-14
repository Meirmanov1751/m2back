const {Schema, model} = require('mongoose')

const schema = new Schema({
  imagename: String,
  title: String,
  content: String
});

module.exports = model('Post', schema)
