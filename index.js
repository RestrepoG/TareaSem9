//const http = require('http')
//const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        "id" : 1,
        "content" : "Me Tengo Que Suscribir A @medudev En YouTube Y Twitch",
        "date" : "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id" : 2,
        "content" : "Tengo Que Estudiar Las Clases Del FullStack Bootcamp",
        "date" : "2019-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id" : 3,
        "content" : "Repasar Los Retos De JS De Medudev",
        "date" : "2019-05-30T19:20:14.298Z",
        "important": true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type':'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/API/notes', (request, response) => {
    response.send(notes)
})

app.get('/API/notes/:id', (request, response) => {
    const id= Number(request.params.id)
    const note = notes.find(note => note.id == id)
    if (notes) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/API/notes/:id', (request, response) => {
    const id= Number(request.params.id)
    notes= notes.filter(note => note.id != id)
    response.status(204).end()
})

app.post('/API/notes/', (request, response) => {
    const note= request.body

    if (!note || !note.content) {
        return response.status(400).json({
            error: "note.content is missing"
        })
    }

    const ids= notes.map(note => note.id)
    const MaxId= Math.max(...ids)

    const NewNote= {
        id: MaxId+1,
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.important != undefined ? note.important : false
    }

    notes= [...notes, NewNote]

    response.status(201).json(note)
}) 

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server Running On Port ${PORT}`)
})
