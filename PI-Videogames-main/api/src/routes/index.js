const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Genre, Videogame} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.rawg.io/api/games?key=e3a7fece4bc44e708d9fdea865d2697a',{headers: {"Accept-Encoding": "gzip,deflate,compress"}});     
        
    const apiInfo = await apiUrl.data.results.map(el =>{
        return {
            name: el.name,
            released: el.released,
            rating: el.rating,
            platfomrs: el.parent_platforms.map(el => el.platform.name),
        }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
}

const getAllVideogames = async  () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/videogames', async (req, res) => {
    const name = req.query.name;
    let videogamesTotal = await getAllVideogames();
    if (name) {
        let videogameName = await videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        videogameName.length ?
        res.status(200).send(videogameName) :   
        res.status(404).send('Game Over! Juego no encontrado');
    } else {
        res.status(200).send(videogamesTotal)
    }
})

module.exports = router;
