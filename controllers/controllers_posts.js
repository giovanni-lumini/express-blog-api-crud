const posts = require("../db/db_posts.js")

//serve per aggiornare il contenuto del file db
const fs = require("fs")

//primo post in db
const index = (req, res) => {
    res.json({
      data: posts,
      count: posts.length
    })
}

//aggiungo i post
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

module.exports = {
    index,
    store
}