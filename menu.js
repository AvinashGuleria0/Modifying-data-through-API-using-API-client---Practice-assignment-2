const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./menuItems')
const app = express();

app.use(express.json())

app.post('/', async(req, res) => {
    try{
        const {name, description, price} = req.body;
        
        if (!name || !price){
            return res.status(400).json({message: `Name and price required`})
        }
        const newItem = new MenuItem({name, description, price});
        await newItem.save();
        
        res.status(201).json({message: `MenuItem added!`, item: newItem})
    }catch(err) {
        console.log(err);
    }
});

app.get("/", async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.put('/:id', async(req, res) => {
    const {name, description, price} = req.body;
    
    if (!name && !description && !price){
        return res.status(400).json({message: `At least one field required to update`})
    }
    try{
        const updateItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            {name, description, price},
            {new: true, runValidators: true}
        );

        if (!updateItem){
            return res.status(404).json({message: `Menu item not found`})
        }
        res.json(updateItem);

    }catch(err){
        console.log(err);
    }
})

app.delete('/:id', async(req, res) => {
    try{
        const deleteItem = await MenuItem.findByIdAndDelete(req.params.id);

        if(!deleteItem){
            return res.status(404).json({message: `Menu item not found`})
        }

        res.json({message: `Item deleted successfully`})
    }catch(err){
        console.log(err)
    }
})

module.exports = app;