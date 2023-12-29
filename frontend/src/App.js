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
  //je doit trouver une solution s that the page will be rundered a chaque fois qu'un changement arrive

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

  function getmessage(){
    const per = tasks.filter(t=> t.done).length / tasks.length *100
    console.log(per)
    if (per===0) {
      return("Try doing at least one 🥹")
    }else if(per===100){
      return("Nice job for today ⛱️")
    }else{
      return("Keep it going 💪🏻!")
    }
  }

  return (
    <main>
      <h1>{tasks.filter(t=> t.done).length}/{tasks.length} Complete</h1>
      <h2>{getmessage()}</h2>
      <TaskForm onadd={addTask} />
      {tasks.map((task,index)=>(
        <Task key={index} {...task} />
      ))}
    </main>
  );
}

export default App;
