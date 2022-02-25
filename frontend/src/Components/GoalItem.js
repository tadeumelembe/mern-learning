
function GoalItem({ removeGoal, goal }) {

    return (
        <div className='goal'>
            <div>created: {new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button className='close' onClick={() => removeGoal(goal._id)}>
                X
            </button>
            <div> Deadline: {new Date(goal.deadline).toLocaleString('en-US')}</div>

        </div>
    )
}

export default GoalItem