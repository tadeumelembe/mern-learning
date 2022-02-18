const asynHandler = require('express-async-handler')
// @desc    Get Goals
// @route   Get /api/goals
// @access  private
const getGoals = asynHandler(async (req, res) => {
    res.status(200).json({
        message: 'get goals'
    })
})

// @desc    Create Goal
// @route   Post /api/goals
// @access  private
const setGoal = asynHandler((req, res) => {
    console.log(req.body)
    if(!req.body.date){
        res.status(400)
        throw new Error('date empty');
    }
    res.json({
        message: 'create goals'
    })
})

// @desc    Update Goal
// @route   Put /api/goals/:id
// @access  private
const putGoal = asynHandler(async (req, res) => {
    res.status(200).json({
        message:`Update goals ${req.params.id}`
    })
})

// @desc    Delete Goal
// @route   Delete /api/goals/:id
// @access  private
const deleteGoal = asynHandler(async (req, res) => {
    res.status(200).json({
        message:`Delete goals ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}