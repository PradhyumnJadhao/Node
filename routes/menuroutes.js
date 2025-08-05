const express = require('express');
const router = express.Router();

const Menu = require('../models/menu');

router.post('/',async(req,res)=>{
  try{
    const menudata = req.body;
    const menu = new Menu(menudata);
    await menu.save();
    console.log('Menu saved:', menu);
    res.status(201).json(menu);
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/',async(req,res)=>{
  try{
    const response = await Menu.find();
    console.log('Menu fetched:', response);
    res.status(200).json(response);
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/taste/:taste', async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste=='Sweet' || taste=='Sour' || taste=='Spicy' || taste=='Salty'){
            const response = await Menu.find({taste:taste});
            console.log(`Menu with taste ${taste} fetched:`, response);
            res.status(200).json(response);
        }else{
            res.status(400).send('Invalid taste specified');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/category/:category', async(req,res)=>{
    try{
        const category = req.params.category;
        if(category=='Veg' || category=='Non Veg'){
            const response = await Menu.find({category:category});
            console.log(`Menu with category ${category} fetched:`, response);
            res.status(200).json(response);
        }else{
            res.status(400).send('Invalid category specified');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/drinks/:drinks', async(req,res)=>{
    try{
        const drinks = req.params.drinks;
        if(drinks == 'true' || drinks == 'false'){
            const response = await Menu.find({isdrink:drinks === 'true'});
            console.log(`Drinks fetched:`, response);
            res.status(200).json(response);
        }else{
            res.status(400).send('Invalid drinks parameter specified');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const updateddata = req.body;
        const response = await Menu.findByIdAndUpdate(id, updateddata,{
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).send('Menu item not found');
        }
        console.log('Menu item updated:', response);
        res.status(200).json(response);
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await Menu.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({error: 'Menu item not found'});
        }
        console.log('Menu item deleted:', response);
        res.status(200).json({message: 'Menu item deleted successfully'});
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;