const express = require('express')
const router = express.Router()
const {getGoals, setGoal, putGoal, deleteGoal} = require('../Controllers/goalController')
const {protect} = require('../Middleware/authMIddleware')
router.route('/').get(protect,getGoals).post(protect,setGoal)

router.route('/:id').put(protect, putGoal).delete(protect,deleteGoal)

module.exports = router