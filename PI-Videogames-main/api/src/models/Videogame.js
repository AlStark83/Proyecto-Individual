const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
//     ID: * No puede ser un ID de un videojuego ya existente en la API rawg
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
// Nombre *
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
// Descripción *
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
// Fecha de lanzamiento
    released: {
      type: DataTypes.STRING,
      allowNull: true,
    },
// Rating
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
// Plataformas *
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
// Creado en BASE DE DATOS *
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }    
  });
};
