const posts = require("../db/db_posts.js")

//serve per aggiornare il contenuto del file db
const fs = require("fs")

//leggo i posts
const index = (req, res) => {
    res.json({
      data: posts,
      count: posts.length
    })
}

//aggiungo un post
const store = (req, res) => {
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        tags: req.body.tags
    }
    posts.push(post)

    //aggiorno il contenuto dell'array permanentemente del file db
    fs.writeFileSync("./db/db_posts.js", `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
    })
}


//modifico un post
const update = (req, res) => {
    const post = posts.find(post => post.title.toLowerCase() ===(req.params.title))

    if(!post){
        return res.status(404).json({
            error: `Post dal titolo ${req.params.title} non trovato`
        })
    }
    
    post.title = req.body.title
    post.slug = req.body.slug
    post.content = req.body.content
    post.tags = req.body.tags

    //aggiorno il contenuto dell'array permanentemente del file db
    fs.writeFileSync("./db/db_posts.js", `module.exports = ${JSON.stringify(posts, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: posts
    })
}

//elimino un post
const destroy = (req, res) => {
    const post = posts.find(post => post.slug.toLowerCase() ===(req.params.slug))

    if(!post){
        return res.status(404).json({
            error: `Post dallo slug ${req.params.slug} non trovato`
        })
    }
    
    const new_posts = posts.filter(post => post.slug.toLowerCase() !==(req.params.slug))

    //aggiorno il contenuto dell'array permanentemente del file db
    fs.writeFileSync("./db/db_posts.js", `module.exports = ${JSON.stringify(new_posts, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: new_posts,
        count: new_posts.length
    })
}

module.exports = {
    index,
    store,
    update,
    destroy
}