const asynchandler = reqiure('express-async-handler');

//@desc   get goals
//@route  GET /api/goals
//@access Private
const getGoals = asynchandler (async (req, res) => {
    res.status(200).json({message: 'Get goals'})
})

//@desc   Set goal
//@route  POST /api/goals
//@access Private
const setGoal = asynchandler(async (req, res) => {
    if(!req.body.text) {
       res.status(400)
       throw new Error('Please add a text')
    }
    res.status(200).json({message: 'Set goal'})
})

//@desc   Update goals
//@route  PUT /api/goals/:id
//@access Private
const updateGoal = asynchandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

//@desc   Delete goals
//@route  DELETE /api/goals/:id
//@access Private
const deleteGoal = asynchandler(async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}