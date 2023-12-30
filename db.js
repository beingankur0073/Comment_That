function connectToDB() {
    // This code is entirely responsible for making connection to database
    const mongoose = require('mongoose')
    const URL = `mongodb://localhost:27017/comments`

    mongoose.connect(URL, {
        useUnifiedTopology: true,
        useFindAndModify: true,
        useNewUrlParser:true
    })

    const connection = mongoose.connection
    connection.once('open', ()=> {
        console.log('Connected To Database...')
    }).catch((err)=>{
        console.log('Connection Failed...')
        console.log(err);
    })
}

module.exports = connectToDB