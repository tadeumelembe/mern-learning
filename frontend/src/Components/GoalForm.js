
import { useState } from 'react'

function GoalForm({ createNew }) {
    const [formData, setFormData] = useState({
        text: '',
        deadline: ''
    })

    const [emptyValidation, setEmptyValidation] = useState(false)
    const [dateValidation, setDateValidation] = useState(false)
    const [loadingBottom, setLoadingBottom] = useState(false);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'deadline') {
            setDateValidation(false)
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        //Validade if is empty
        if (!formData.text || !formData.deadline) {
            setEmptyValidation(true)
            return
        }

        //Validade if date is smaller than current date
        if (new Date(formData.deadline) < new Date()) {
            setDateValidation(true)
            return
        }
        const goalData = {
            text: formData.text,
            deadline: formData.deadline
        }
        setLoadingBottom(true)
        const res = await createNew(goalData)
        setLoadingBottom(false)
    }

    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    const emptyFormValidation = (elementName) => {
        return (<label style={{ marginTop: -10, color: 'red' }}>{elementName} cannot be empty</label>)
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={formData.text}
                        onChange={onChange}
                    />
                    {emptyValidation && <>
                        {!formData.text && emptyFormValidation('Goal')}
                    </>
                    }

                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Deadline</label>
                    <input
                        type='date'
                        name='deadline'
                        id='deadline'
                        value={formData.deadline}
                        onChange={onChange}
                    />
                    {emptyValidation && <>
                        {!formData.deadline && emptyFormValidation('Deadline')}
                    </>
                    }
                    {dateValidation &&
                        <label style={{ marginTop: -10, color: 'red' }}>The date must be greater than {getDate()}</label>
                    }

                </div>

                <div className='form-group'>
                    {loadingBottom ? <button className='btn btn-block'>Loading</button> :
                        <button className='btn btn-block' type='submit'>
                            Add Goal
                        </button>
                    }
                </div>
            </form>
        </section>
    )
}

export default GoalForm