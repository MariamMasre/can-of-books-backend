'use strict';
const express = require('express');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();

const mongoose = require('mongoose'); // 0 - import mongoose
const server = express();

server.use(cors());

const PORT = process.env.PORT || 3010;
// mongoose config
mongoose.connect('mongodb://localhost:27017/Book', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB (301d35-cats)


const bookSchema = new mongoose.Schema({ 
    //define the schema (structure)
    title: String,
    description: String,
    status: String,
  });
  const BookModel = mongoose.model('BookModel', bookSchema); //compile the schem into a model

//seed data (insert initial data)
async function seedData(){
    const firstBook = new BookModel({
        title: "The man confused between science and superstition",
    description: "It can be said that the book, from A to Z, is a swim against the tide. The book was published at the end of the seventies, at a time when myths were largely prevalent in the Arab collective mind, either theorizing towards supporting conspiracy theories, or charlatanism in the name of science, or charlatanism in the name of religion, and distortion of facts.",
    status:  "I didn't read it",
    })

    const secondBook = new BookModel({
        title: "Obsessive Genius, The Inner World of Marie Curie",
        description: "In The Obsession of Genius, The Inner World of Marie Curie, we go to a world completely different from the world of scientific laboratories; Where the writer (Barbara Goldsmith) sheds light on the 'life' of Marie Curie and her problems, and the crises that she faced since her childhood and youth, in an era when Europe did not welcome women much in the fields of scientific and social work.",
        status: "I read it",
    })

    const thirdBook = new BookModel({
        title: "Bilal Code",
    description: "The narrator embodies the suffering on each of its pages, telling the story of an American child with cancer named (Bilal), who communicates with a religiously skeptical academic writer, who accidentally introduces him to the character of Bilal bin Rabah - may God be pleased with him -, which makes the child go through the long journey of his illness with Projections of the personality and life of the great companion. At the same time as his grieving mother is going through a journey of pain, and the writer suffers from a struggle over faith and atheism.",
    status: "I didn't read it",
    })

    await firstBook.save();
    await secondBook.save();
    await thirdBook.save();
}

//seedData();
// http://localhost:3000/
server.get('/',(seq,res) =>{
res.send("hi i am home route");
})

server.get('/getBook',getBookHandler);
server.get('*',defaultHandler);

function getBookHandler(req,res) {
    BookModel.find({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);
        }
    })
}

function defaultHandler(req,res) {
res.status(404).get("Sore .Pag not found");
}
server.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})