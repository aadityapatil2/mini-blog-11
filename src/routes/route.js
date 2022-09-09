const express = require('express');
const router = express.Router();
const authorcontroller = require('../controllers/authorController')
const blogcontroller = require('../controllers/blogController')
const middleware = require("../middlewares/auth")




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
// ===========================================================
//creaet author
router.post("/authors", authorcontroller.createAuthor)

//login
router.post("/login", authorcontroller.login)

//create blogs
router.post("/blogs", middleware.authenticate, blogcontroller.createBlog)

//find
router.get("/blogs", middleware.authenticate, blogcontroller.getBlogs)

//update
router.put("/blogs/:blogId", middleware.blogvalid, middleware.authenticate, middleware.authorise, blogcontroller.updateBlog)

//delete
router.delete("/blogs/:blogId", middleware.blogAuthorise, middleware.authenticate, middleware.authorise, blogcontroller.deleteBlogsParam)

//delete
router.delete("/blogs", middleware.authenticate, middleware.deleteAuthorised, blogcontroller.deleteBlogsQuery)







module.exports = router;