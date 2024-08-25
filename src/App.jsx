import {  useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';
import { Routes ,Route} from 'react-router-dom';
import Home from './components/Home';
import Task from './components/Task';
import Register from './components/register';
import axios from 'axios';


function App() {
  const [todo, settodo] = useState("");
  //todos is an arrray that hold our all todo
  const [todos, settodos] = useState([]);

  const [finished,setfinished]=useState(true);
 
useEffect(()=>{
  axios.get('http://localhost:8000').then(res=>{
if(res.data.Status==200){

}else{
  
}

  })
})

const saveToLocalStorage=()=>{
  localStorage.setItem("todos",JSON.stringify(todos));
 
  
}

  const handleEdit = (e) => {
   
    let id = e.target.name;
    const newtodos = todos.filter((item) => {
      return item.id != id;
    })
    const edittodo = todos.filter((item) => {
      return item.id == id;
    })
 
    settodo(edittodo[0].todo);
    settodos(newtodos);
   
    
  }
  const handleDelete = (e) => {
    let id = e.target.name;
   let res=confirm("are you sure,that you want to delete? ")
   if(res){ 
   let newtodos = todos.filter(item => item.id != id);
    settodos(newtodos);
   }
  }
  const handleAdd = () => {
    //add todos into todos array
    if (todo != "") {
      
      settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
     
      settodo("");
    
  }
  }
  const handleChange = (e) => {
    settodo(e.target.value)
    
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map((item) => {
      if (item.id == id) {
        settodos(item.iscompleted = !item.iscompleted);
      }
      return item;
    })
    settodos(newTodos);
    
   
    
  }
  useEffect(()=>{
    if(localStorage.getItem("todos")){
   settodos(JSON.parse(localStorage.getItem("todos")));
  }
  },[]);
  useEffect(()=>{
    saveToLocalStorage();
  },[handleAdd,handleDelete,handleEdit,handleCheckbox])
 const toggleFinish=()=>{
  setfinished(!finished);

 }
  return (
   <>
    
     
      <Routes>
      <Route path='/' element={<Home actiomn={App} />}></Route>
        <Route path='/todo' element={
           <>
           <NavBar />
          <div className="container mx-auto my-5 bg-violet-100 rounded-xl p-5  w-1/2">
        
        <div className="add-todo pb-9">
          <h1 className='text-center font-bold text-[20px] sm:text-[2rem] py-3'>What to do</h1>
          <h2 className='sm:text-lg text-[15px] font-bold'>Add a Todo</h2>
          <div className="flex flex-wrap gap-3 lg:gap-0">
          <input type="text"  value={todo} onChange={handleChange} className='w-4/5' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 sm:px-3 sm:py-1 px-1 py-0.5 w-4/5 lg:w-14 text-white rounded-md font-bold'>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinish} checked={finished} className='sm:w-auto sm:h-auto w-3 h-3'  id="" /> <span className='sm:text-lg text-[12px]'>Show Finished</span>
        <h2 className='sm:text-lg text-[15px] font-bold my-2 '>Your List</h2>
        <div className='todos'>
          {todos.length == 0 ? <div className='m-5'>No todos to display</div> : ""}
          {todos.map((item) => {

            return (finished || !item.iscompleted) && (

              <div className='todo flex lg:flex-nowrap flex-wrap my-3 w-1/2 justify-between items-center' key={item.id} >
                <div className='flex gap-5'>
                  <input type="checkbox" onChange={handleCheckbox} checked={item.iscompleted} name={item.id} />
                  <div className = {item.iscompleted ? 'line-through' : "" }  > {item.todo} </div>
                </div>
                <div className="buttons flex  gap-2 h-full">
                  <button onClick={handleEdit} name={item.id} className='sm:px-3 sm:py-1 px-1 py-0.5 bg-violet-800 hover:bg-violet-950 px-3 py-1  text-white rounded-md font-bold text-sm lg:text-[15px] mx-1 '>Edit</button>
                  <button onClick={handleDelete} name={item.id} className='sm:px-3 sm:py-1 px-1 py-0.5 bg-violet-800 hover:bg-violet-950 px-3 py-1  text-white rounded-md font-bold text-sm mx-1 text-[15px]'>Delete</button>
                </div>
              </div>

            )
          })}


        </div>
      </div> </>}></Route>
        
        <Route path='/task' element={
          <>
          <NavBar/>
          <Task todos={todos} />
          </>}></Route>
          <Route path='/register' element={<Register/>}></Route>
      </Routes>

    </>
  )
}

export default App;
