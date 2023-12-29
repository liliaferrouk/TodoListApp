import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import React from 'react';

function App() {
  const [tasks,setTasks] = React.useState([])
  React.useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/tasks`)
    .then(res=>res.json())
    .then(data => setTasks(data))
  },[])

  function addTask(notename){
    fetch(`http://127.0.0.1:8000/api/tasks`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({note: notename})
      })
    setTasks(prev =>{
      return [...prev, {note:notename, done:false}]
    })
  }
  return (
    <main>
      <TaskForm onadd={addTask} />
      <p>{tasks.length}</p>
      {tasks.map((task,index)=>(
        <Task key={index} {...task} />
      ))}
    </main>
  );
}

export default App;
