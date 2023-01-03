require('dotenv').config();
const { Router } = require('express');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Genre, Platform, Videogame} = require('../db')

const router = Router();
const URLgames = `https://api.rawg.io/api/games?key=${API_KEY}`; 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(URLgames,{headers: {"Accept-Encoding": "gzip,deflate,compress"}});     
        
    const apiInfo = await apiUrl.data.results.map(el =>{
        return {
            id: el.id,
            name: el.name,
            released: el.released,
            rating: el.rating,
            platfomrs: el.parent_platforms.map(el => el.platform.name),
            genres: el.genres.map(el => el.name),
            image: el.background_image,
            createdInDb: false
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
            model: Platform,
            attributes: ['name'],
            through:{
                attributes: [],
            }
        }
    })
}

const getAllVideogames = async  () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router
.get('/videogames', async (req, res) => {
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
.get('/videogames/:id', async (req, res) => {
    const id = req.params.id;
    const videogamesTotal = await getAllVideogames();
    if(id){
        let videogameId = await videogamesTotal.filter(el => el.id == id);
        videogameId.length?
        res.status(200).json(videogameId) :
        res.status(404).send('Videojuego no encontrado');    
    }
})
.get('/genres', async (req, res) =>{
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`,{headers: {"Accept-Encoding": "gzip,deflate,compress"}})
    const genres = genresApi.data.results.map(el => el.name);
    
    genres.forEach(el  => {
        Genre.findOrCreate({
            where: { name: el }
        })        
    })
    const allGenres = await Genre.findAll();
    res.send(allGenres);
})
.get('/platforms', async (req, res) =>{
    const platformsApi = await axios.get(URLgames,{headers: {"Accept-Encoding": "gzip,deflate,compress"}})
    const platforms = platformsApi.data.results.map(el => el.platforms)
    const platformEach = platforms.map(el => {
       for(let i = 0; i < el.length; i++) {return el[i].platform.name}
    })
    console.log(platformEach)
    platformEach.forEach(el  => {
        Platform.findOrCreate({
            where: { name: el }
        })        
    })
    const allPlatforms = await Platform.findAll();
    res.send(allPlatforms);
})
.post('/videogames', async (req,res) =>{
    let {
        name,
        description,
        released,
        rating,
        platforms,
        createdInDb,
        genre
    } = req.body;

    let videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        createdInDb,
    })

    let genreDB =  await Genre.findAll({ where: { name: genre} });
    videogameCreated.addGenre(genreDB)
    let platformDB =  await Platform.findAll({ where: { name: platforms} });
    videogameCreated.addGenre(platformDB);
    res.send('Videojuego agregado con éxito')
})


module.exports = router;
