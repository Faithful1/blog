
import db from 'db'


const schema = new db.Schema({
  title: String,
  content: String,
}, {
  timestamps: true,
})


export default db.model('Article', schema)
