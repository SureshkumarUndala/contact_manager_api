const express = require('express')
const router = express.Router()
const contactsModel = require('./schema')

router.post('/', async (req, res) => {
    try {
        const newContact = await contactsModel.create(req.body)
        res.status(200).json(newContact)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            error: `Missing required field(s): ${error.message}`
        }
        )
    }
})
router.get('/', async (req, res) => {
    try {
        const allContacts=await contactsModel.find()
        res.status(200).json(allContacts)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const particularContacts=await contactsModel.findOne({_id:id})
        res.status(200).json(particularContacts)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const particularContacts=await contactsModel.findOneAndDelete({_id:id})
        res.status(204).send({
            message:"successfully deleted"
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})
router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const particularContacts=await contactsModel.findOneAndUpdate({_id:id},req.body)
        res.status(200).json({message:"updated successfully"})
    } catch (error) {
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
})
router.patch('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const exist = await contactsModel.find({ _id: id },req.body)
        if (!exist) {
            return res.status(404).json({
                "error": "There is no contact with that id"
            })
        }
        res.json({
            message:"updated successfully"
        })
    } catch (error) {
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
})
module.exports = router