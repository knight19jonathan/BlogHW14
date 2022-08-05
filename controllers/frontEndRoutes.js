const express = require('express');
const router = express.Router();
const {User,post} = require('../models');

router.get("/",(req,res)=>{
   post.findAll({
        include:[User]
    }).then(data=>{
        const hbsData = data.map(proj=>proj.toJSON())
        res.render("homepage",{
           posts:hbsData,
            logged_in:req.session.logged_in
        })
    })
})

router.get("/post/:id",(req,res)=>{
   post.findByPk(req.params.id).then(projData=>{
        const hbsData = projData.toJSON();
        hbsData.logged_in=req.session.logged_in
        res.render("post",hbsData)
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        res.redirect("/profile")
    }
    res.render("login",{logged_in:false})
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[ post ]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=true;
        res.render("profile",hbsData)
    })
})

module.exports = router;