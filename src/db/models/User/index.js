import db from 'db'


const schema = new db.Schema({
  first_name: String,
  last_name: String,
  flair: String,

  rank: {
    type: String,
    enum: [
      'ADMIN',
      'MODERATOR',
      'AUTHOR',
      'VERIFIED',
      'UNVERIFIED',
      'BANNED',
    ],
    default: 'UNVERIFIED',
  },
}, {
  timestamps: true,
})


export default db.model('User', schema)
