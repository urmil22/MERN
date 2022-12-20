const asynchandler = require('express-async-handler');

const Goal = require('../models/goalModel')

//@desc   get goals
//@route  GET /api/goals
//@access Private
const getGoals = asynchandler (async (req, res) => {
    const goals = await Goal.find() 

    res.status(200).json(goals)
})

//@desc   Set goal
//@route  POST /api/goals
//@access Private
const setGoal = asynchandler(async (req, res) => {
    if(!req.body.text) {
       res.status(400)
       throw new Error('Please add a text')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

//@desc   Update goals
//@route  PUT /api/goals/:id
//@access Private
const updateGoal = asynchandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, 
        req.body, {new: true})

    res.status(200).json(updatedGoal)
})

//@desc   Delete goals
//@route  DELETE /api/goals/:id
//@access Private
const deleteGoal = asynchandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}