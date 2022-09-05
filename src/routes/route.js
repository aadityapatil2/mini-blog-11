const express = require('express');
const router = express.Router();
const authorcontroller = require('../controllers/authorController')
const blogsController = require('../controllers/blogController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors",authorcontroller.createAuthor)

            
router.get("/blogs",blogController.getBlogs)

module.exports = router;