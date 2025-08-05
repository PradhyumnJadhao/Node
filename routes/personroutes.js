const express = require('express');
const router = express.Router();

// Importing the Person model from our designed Schema
const Person = require('../models/person');

router.post('/', async(req,res)=>{
  try{
    const data = req.body;
    const person = new Person (data);
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
    res.status(201).json(savedPerson);
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/',async(req,res)=>{
  try{
    const response = await Person.find();
    console.log('Persons fetched:', response);
    res.status(200).json(response);
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:worktype', async(req,res)=>{
  try{
    const worktype = req.params.worktype;
    if(worktype == 'Chef' ||  worktype == 'Waiter' || worktype == 'Manager'){
      const response = await Person.find({work:worktype});
      console.log(`Persons with work type ${worktype} fetched:`, response);
      res.status(200).json(response);
    }else{
        res.status(400).send('Invalid work type specified');
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
        const response = await Person.findByIdAndUpdate(id,updateddata,{
          new: true,
          runValidators: true
        });
        if(!response){
            return res.status(404).send('Person not found');
        }
        console.log('Person updated:', response);
        res.status(200).json(response);
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await Person.findByIdAndDelete(id);
    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('Person deleted:', response);
    res.status(200).send('Person deleted successfully: \n' + response);
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// coment added to check if the file is working
module.exports = router;