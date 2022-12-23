const express = require('express');
// const { Router } = require('express');
const router = express.Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',(req, res) => {
    res.send('<h1>Welcome Player 1</h1><br/><h3>Press Start</h3><iframe width="560" height="315" src="https://www.youtube.com/embed/qFmwRriNJWs?start=715" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
})


module.exports = router;
