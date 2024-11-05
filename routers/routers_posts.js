const express = require("express")
const router = express.Router()

const controllers_posts = require ("../controllers/controllers_posts.js")

router.get('/', controllers_posts.index)
router.post("/", controllers_posts.store)

module.exports = router