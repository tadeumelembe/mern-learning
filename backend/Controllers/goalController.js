const asynHandler = require('express-async-handler')
const Goal = require('../Models/goalModel')

// @desc    Get Goals
// @route   Get /api/goals
// @access  private
const getGoals = asynHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc    Create Goal
// @route   Post /api/goals
// @access  private
const setGoal = asynHandler(async (req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('date empty');
    }
    const goal = await Goal.create({
        text: req.body.text,
        deadline: req.body.deadline
    })
    res.status(200).json(goal)
})

// @desc    Update Goal
// @route   Put /api/goals/:id
// @access  private
const putGoal = asynHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    })
    res.status(200).json(updatedGoal)
})

// @desc    Delete Goal
// @route   Delete /api/goals/:id
// @access  private
const deleteGoal = asynHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    //const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
    await goal.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}