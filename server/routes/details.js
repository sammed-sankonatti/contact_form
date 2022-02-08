const router = require('express').Router()
const User = require('../models/details')
const cors = require('cors')
router.use(cors())
const fs = require('fs')

router.post('/savetodb', async(req,res)=>{
    const newUser = new User({
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone : req.body.phone,
        zipcode : req.body.zipcode
    });

    const userDetails = await newUser.save()
    res.status(200).json({message : "details saved to Database"})
})

router.post('/savetolocaldb', async(req,res)=>{
    const localUser = {
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone : req.body.phone,
        zipcode : req.body.zipcode
    }

    // const localdata = JSON.stringify(localUser)
    // console.log(localdata);

    // fs.appendFile('./localDb.json', JSON.stringify(localUser, null,2), err=>{
    //     if(err)
    //         console.log(err);
    //     else
    //     res.json({success : "saved successfully"})
    // })

    const existingUsers = fs.readFileSync('./localDb.json', 'utf-8');
    if(existingUsers.length !== 0)
        var userDetails = JSON.parse(existingUsers);
    else
        userDetails = [];

    userDetails.push(localUser)
    const NewData = JSON.stringify(userDetails, null, 2);
    fs.writeFileSync('./localDb.json', NewData);
    res.json({message : "details saved to file"})
})


module.exports = router;
