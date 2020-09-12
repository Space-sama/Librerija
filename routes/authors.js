const express = require('express');
const router =  express.Router();

const Author = require('../models/author');
const Book = require('../models/book');
 


// All Authors Route
router.get('/', async (req, res) =>{

    let searchOptions = {};
    if (req.query.name != null && req.query.name !== "") {

        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try{

    // const authors = await Author.find({}); // if I want all from the database
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { 
        authors: authors, 
        searchOptions:  req.query,
    });

    }catch{
        res.render('/');
    }
});


// Displaying the form of the creation the author(s) | New Author Route
router.get('/new', (req, res) => {

    res.render('authors/new', {author: new Author() });

});


// Create Author Route
router.post('/', async (req, res) => {

     const author = new Author({

            name: req.body.name,
        });

    try{

        const newAuthor = await author.save();
        // res.redirect(`authors/, ${newAuthor.id}`);
        res.redirect('/authors');


    }catch{

        res.render('authors/new', {
            
            author: author,
            errorMessage: "Put a name of the author, please.",
        
        });
    }
    

});

//show author
router.get('/:id', async(req, res) => {

    try{
        const author = await Author.findById(req.params.id);
        const books = await Book.find({ author: author.id }).limit(6).exec();
        res.render('authors/show', {
            author: author, 
            booksByAuthor: books,
        });
    }catch(e) {
        console.log(e);
        res.redirect('/');
    }
});



router.get('/:id/edit', async(req, res) => {

    try{
        const author = await Author.findById(req.params.id)

        res.render('authors/edit', { author: author });

        }catch {
            res.redirect('/authors');
    }
});


router.put('/:id', async(req, res) => {

    let author;
try{

    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/, ${author.id}`);


}catch{

    if(author == null){
        res.redirect('/');

    } else {
        res.redirect(`/authors/${req.params.id}/edit`);
    }

    
}
});

router.delete('/:id', async (req, res) => {
    let author;
try{

    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect('/authors');


}catch{

    if(author == null){
        res.redirect('/');

    } else {
        res.redirect(`/authors/${author.id}`);
    }
}
});


// author.save((err, newAuthor) => {

//     if (err) {
//         
//     } else {
//         res.redirect('/authors');
//     }

// });






module.exports = router;