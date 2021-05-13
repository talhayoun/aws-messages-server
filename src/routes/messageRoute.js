const express = require("express");
const router = express.Router();
const message = require("../model/messageModel");

router.post("/", async(req, res)=>{
    console.log(req.body)
    try{
        const newMessage = await new message({title: req.body.title, message: req.body.message})
        console.log(newMessage)
        if(!newMessage){
            return res.status(404).send("Failed to create new message");
        }
        await newMessage.save();
        console.log("yeah")
        res.send();
    }
    catch(err){
        res.status(404).send(err.message);
    }

})

router.get("/messages", async(req, res)=>{
    try{
        const messages = await message.find({});
        if(!messages){
            return res.status(404).send();
        }
        console.log(messages)
        res.send(messages);
    }
    catch(err){
        return res.status(404).send()
    }
})

module.exports = router;