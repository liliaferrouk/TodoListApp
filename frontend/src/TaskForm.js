import React from 'react'

function TaskForm() {
    const [taskName,setTaskName] = React.useState("")

    function hundelChange(event){
        setTaskName(event.target.value)
        console.log(taskName)
    }
  return (
    <div>
        <form action="">
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