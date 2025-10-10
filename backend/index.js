const app = require('./app') // The Express app
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const path = require("path")

const PORT = config.PORT || 3001
    app.listen(PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
    })
}