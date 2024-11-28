const { Router } = require('express');
const mongoose = require('mongoose');
const cnt_schema =require('../schema/schema');
const fs = require('fs');
const { title } = require('process');

const router=Router()
router.get('/addcontacts',(req, res)=>{
    res.render('contact/addcontact')
    
    router.post('/addcontacts',async (req, res)=>{
    await cnt_schema.create(req.body)
    console.log(req.body)
    res.redirect('/home',302,{})

});

})


router.get('/allcontact', async (req, res) => {
    let data = await cnt_schema.find({}).lean()
    console.log(data);
    res.render('Contact/cnt_list',{title:'AllContact',data}); // Wrap data in an object
});
router.get('/design',(req, res)=>{
fs.readFile('./public/cnt.css',  (err,data)=>{
    if(err)res.send(err)
        res.end(data)
    
    })
})
/// single contact
router.get('/:id', async (req, res)=>{
    let data = await cnt_schema.findOne({_id:req.params.id}).lean() //document java script plain object
    console.log(data);
    res.render('Contact/single_cntlist',{title:'SingleContact',data}); // Wrap data in an object
})
router.get('/edit/:id', async (req, res)=>{
    let editdata = await cnt_schema.findOne({_id:req.params.id}).lean() //getix
    res.render('Contact/edit',{title:'EditContact',editdata});
})
router.post('/edit/:id', async (req, res)=>{
   let editdata= await cnt_schema.findOne({_id:req.params.id})
   
    editdata.firstname=req.body.firstname;
    editdata.lastname=req.body.lastname;
    editdata.phoneno=req.body.phoneno;
    editdata.location=req.body.location;
    await editdata.save()
    console.log(req.body)
   
    res.redirect('/api/allcontact',302,{})
})

router.get('/delete/:id', async (req, res)=>{
    let data = await cnt_schema.deleteOne({_id:req.params.id})
    console.log(data);
    res.redirect('/api/allcontact',302,{})
  
})
router.get('/search', async (req, res) => {
    let data = await cnt_schema.find({}).lean()
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const filteredData = data.filter(user =>
        user.firstname.toLowerCase().includes(query)
    );
    res.render('viewdetails', { data: filteredData });
});

module.exports=router