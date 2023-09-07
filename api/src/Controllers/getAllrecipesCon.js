const getAllrecipes = require("./getAllrecipes");

module.exports = async (req,res)=>{
try {
    const result = await getAllrecipes();
    res.status(201).json(result);
} catch (error) {
    res.status(400).end("No se encontraron recetas");
}
}

