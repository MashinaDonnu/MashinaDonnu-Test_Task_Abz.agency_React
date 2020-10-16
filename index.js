
const express = require('express')
const path = require('path')
const app = express()

function start() {
    app.use('/', express.static(path.join(__dirname, 'task', 'build')))
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Star wars app started on port ${PORT}`)
    })
}

start()
