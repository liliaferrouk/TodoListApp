import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import React from 'react';

function App() {
  const [tasks,setTasks] = React.useState([])
  const [nbrTasksDone,setNbrTasksDone] = React.useState(0)

  React.useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/tasks`)
    .then(res=>res.json())
    .then(data => {
      setTasks(data)
      setNbrTasksDone(data.filter(t=> t.done).length)
    })
  },[])

  React.useEffect(()=>{
    console.log("rendered !")
  },[nbrTasksDone])

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
    if(tasks.length ===0) return ""
    const per = nbrTasksDone / tasks.length *100
    if (per===0) {
      return("Try doing at least one 🥹")
    }else if(per===100){
      return("Nice job for today ⛱️")
    }else{
      return("Keep it going 💪🏻!")
    }
  }

  function deletetask(id){
    console.log(tasks)
    console.log(id)
    const taskdel = tasks.find(task => task.id === id);
    console.log(taskdel.id)
    console.log(taskdel.note)
    console.log(taskdel.done? "true" : "false")
    if(taskdel.done){
      setNbrTasksDone(nbrTasksDone-1)
      console.log("completer --:")
    }
    fetch(`http://127.0.0.1:8000/api/tasks/${id}`,{
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json'
        }
      })
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks)
    console.log("completer:"+nbrTasksDone)
  }

  function check(id){
    const taskToToggle = tasks.find(task => task.id === id);
    fetch(`http://127.0.0.1:8000/api/tasks/${id}`,{
      method: "PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note:taskToToggle.note,done:true})
    })
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    setNbrTasksDone(prev=> prev+1)
  }

  function decheck(id){
    const taskToToggle = tasks.find(task => task.id === id);
    fetch(`http://127.0.0.1:8000/api/tasks/${id}`,{
      method: "PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note:taskToToggle.note,done:false})
    })
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    setNbrTasksDone(prev=> prev-1)
  }

  return (
    <main>
      <h1>My ToDo Liste App</h1>
      {tasks.length !==0 && (<h2>{nbrTasksDone}/{tasks.length} Complete</h2>)}
      <h3>{getmessage()}</h3>
      <TaskForm onadd={addTask} />
      {tasks.map((task,index)=>(
        <Task key={index} id={task.id} note={task.note} done={task.done} check={check} decheck={decheck} setNbrTasksDone={setNbrTasksDone} deletetask={deletetask}/>
      ))}
    </main>
  );
}

export default App;
