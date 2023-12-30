const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

const connectToDB = require('./db')
connectToDB()
const Comment = require('./models/comment')

app.use(express.json())

// Routes / Apis

app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })
})

app.get('/api/comments', (req, res) => {
    Comment.find().then((comments)=> {
        res.send(comments)
    })
})

const server = app.listen(PORT, () => {
    console.log(`Listening On Port ${PORT}`)
})


let io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`New Connection: ${socket.id}`)
    // Recieve event
    socket.on('comment-hoyeche', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment-hoyeche', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data) 
    })
})


// const http=require('http');
// http.createServer(PORT,()=>{
//     log
// })