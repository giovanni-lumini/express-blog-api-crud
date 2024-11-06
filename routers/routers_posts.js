const express = require("express")
const router = express.Router()

const controllers_posts = require ("../controllers/controllers_posts.js")

router.get('/', controllers_posts.index)
router.post("/", controllers_posts.store)
router.put("/:title", controllers_posts.update)
/* router.delete("/:title", controllers_posts.destroy) */

module.exports = router