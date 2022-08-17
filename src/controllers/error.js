const path = require('path');


const handleServerError = (err, req, res, next)=>{
    res.status(500).sendFile(path.join(__dirname, '..', '..', 'public', '500.html'))
}

const handleClientError = (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, '..', '..', 'public', '404.html'))
}

module.exports = {handleClientError, handleServerError}