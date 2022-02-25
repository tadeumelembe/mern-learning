import { useContext, useEffect, useState } from "react";

import {useNavigate} from 'react-router-dom'
import axios from "axios";

import GoalForm from "../Components/GoalForm";
import GoalItem from "../Components/GoalItem";
import { UserContext } from "../Context/UserContext";

export default function Dashboard() {
    const { userContextState } = useContext(UserContext)

    const [goalList, setGoalList] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    useEffect(() => {
        if (!userContextState.token)
            return navigate('/login');
        console.log(userContextState.token)
        fetchGoals()

    }, [])

    const fetchGoals = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userContextState.token}`
            }
        }
        try {
            const response = await axios.get('/api/goals', config)
            if (response.data) {
                setGoalList(response.data)
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }


    }

    const createNew = async (goalData) => {

        const config = {
            headers: {
                Authorization: `Bearer ${userContextState.token}`
            }
        }
        try {
            const response = await axios.post('/api/goals', goalData, config)
            if (response.data) {
                addNewGoal(response.data)
            }

        } catch (error) {
            setLoading(false)
        }

    }

    const addNewGoal = (goalAdd) => {
        const {_id, text, createdAt, deadline} = goalAdd
        const newGoal = {
            _id: _id,
            text: text,
            deadline: deadline,
            createdAt: createdAt
        }
        setGoalList([...goalList].concat(newGoal))
    }

    const removeGoal = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userContextState.token}`
            }
        }
        try {
            const response = await axios.delete(`/api/goals/${id}`, config)
            setGoalList([...goalList].filter(item => item._id !== response.data.id))
            console.log(response)

        } catch (error) {
            console.log(error.response)
        }

    }


    return (
        <div>
            <GoalForm createNew={createNew} />

            <section className='content'>
                {loading ? <h2>Loagind info</h2>
                    : <>
                        {goalList.length > 0 ?

                            <div className='goals'>
                                {goalList.map((item, index) => {
                                    return (

                                        <GoalItem removeGoal={removeGoal} goal={item} key={index} />
                                    )
                                })}
                            </div>
                            :
                            <h2>You haven't set any goals yet</h2>

                        }
                    </>}
            </section>

        </div>
    )
}