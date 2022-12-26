import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"

function GoalForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({text}))
        setText('')
    }
  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Goal</label>
                <input type="text" onChange={(e) => setText(e.target.value)}
                name="text" id="text" value={text}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Add Goal
                </button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm