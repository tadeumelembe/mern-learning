const express = require('express')
const router = express.Router()
const {getGoals, setGoal, putGoal, deleteGoal} = require('../Controllers/getGoalsController')

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(putGoal).delete(deleteGoal)

module.exports = router