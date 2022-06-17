const express = require('express')
const blogModel = require('../models/blogSchema')
const authMiddleware = require('../middleware/authMiddleware')
//create a router
const router = express.Router()

//get blogs
router.get('/', authMiddleware, async (req,res) => {
    try {
        const blogs = await blogModel.find()
        res.send(200).json(blogs)
    } catch (error) {
        console.log(error)
        
    }
})
//create blogs
router.post('/', async (req,res) => {
    const blogData = req.body //getting data from the request

    try {
        const blog = await blogModel.create(blogData)
        //send back response
        res.status(201).json(blog)

    } catch (error) {
        console.error(error)
        res.status(400).json('Bad request!!!')
        
    }
})
//get blog by ID
router.get('/:id', async (req,res) => {
    const id = req.params.id

    try {
        const blog = await blogModel.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        
    }
})

//update blog by ID
router.put('/:id', async (req,res) => {
    const id = req.params.id
    const newBlogData = req.body
    try {
        const blog = await blogModel.findByIdAndUpdate(id, newBlogData, {new:true})
        res.status(200).json(blog)
    } catch (error) {
        
    }
})

// DELETE blog
router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const blog = await blogModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'Blog post was deleted!'})
    } catch (error) {
        console.log(error)
        
    }
})
module.exports = router