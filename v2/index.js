const express = require("express");
const path = require('path');
const fs = require('fs');

const app = express();

fs.readFile("tasks.json", "utf8", (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        let tasks = JSON.parse(data);
    }
})


app.get("/", )