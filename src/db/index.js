import mongoose from 'mongoose'
import bluebird from 'bluebird'


mongoose.Promise = bluebird
mongoose.connect('mongodb://localhost/blazeblog', {
  useMongoClient: true,
})

// const db = mongoose.connection
// db.on('error', error =>
//   console.log('error occured', error))
//   .once('opened', () =>
//     console.log('connected to db'))


export default mongoose
