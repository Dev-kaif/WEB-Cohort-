const express = require('express')
const app = express()
const port = 300

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  res.send('Hello World of post')
})


app.listen(port)