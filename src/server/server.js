const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'tom',
    age: 1,
    msg: '猫咪'
  })
})
app.listen('3000')