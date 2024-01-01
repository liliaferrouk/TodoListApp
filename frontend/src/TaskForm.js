import React from 'react'

function TaskForm(props) {
    const [taskName,setTaskName] = React.useState("")

    function hundelChange(event){
        setTaskName(event.target.value)
    }
    function hundelSubmit(event){
        //event.preventDefault()
        props.onadd(taskName)
    }
  return (
    <div>
        <form onSubmit={hundelSubmit}>
        <button>+</button>
        <input
            type="text"
            placeholder='Your new task'
            onChange={hundelChange}/>
        </form>
    </div>
  )
}

export default TaskForm