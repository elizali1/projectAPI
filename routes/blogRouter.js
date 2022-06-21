const express = require('express')
const blogModel = require('../models/blogSchema')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', authMiddleware, async (req,res) => {
    try {
        const blogs = await blogModel.find()
        res.sendStatus(200).json(blogs)
    } catch (error) {
        console.log(error)
        
    }
})

router.post('/', async (req,res) => {
    const blogData = req.body 

    try {
        const blogs = await blogModel.create(blogData)
        res.status(201).json(blogs)

    } catch (error) {
        console.error(error)
        res.status(400).json('ERROR-Try again!!')
        
    }
})

router.get('/:id', async (req,res) => {
    const id = req.params.id

    try {
        const blogs = await blogModel.findById(id)
        res.status(200).json(blogs)
    } catch (error) {
        
    }
})

router.put('/:id', async (req,res) => {
    const id = req.params.id
    const newBlogData = req.body
    try {
        const blogs = await blogModel.findByIdAndUpdate(id, newBlogData, {new:true})
        res.status(200).json(blogs)
    } catch (error) {
        
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const blogs = await blogModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'Blog post was deleted!'})
    } catch (error) {
        console.log(error)
        
    }
})
module.exports = router