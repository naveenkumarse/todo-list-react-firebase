
import './App.css';

import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo';
import { useEffect, useState } from 'react';
import {db} from './firebase';
import {query,collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore';


const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  containers: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2 `
}

function App() {
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');
  //create todo 
  const createtodo = async(e)=>{
    e.preventDefault();
    if(input === ''){
      alert('please enter a valid todo');
      return;
    }
    await addDoc(collection(db,'todos'),{
      text: input,
      completed:false,
    })
    setInput('')
  }
  //read todo 

  useEffect(()=>{
      const q = query(collection(db,'todos'))
      const unSubscribe = onSnapshot(q,(querySnapshot)=>{
        let todoArr = []
        querySnapshot.forEach((doc)=>{
          todoArr.push({...doc.data(),id:doc.id})
        });
        setTodos(todoArr);
      })
      return ()=> unSubscribe(); 
  },[])

  //update in firebase 
  const toggleComplete = async (todo)=>{
    await updateDoc(doc(db,'todos',todo.id),{
      completed: !todo.completed
    })
  }

  // delete todo  
  const deleteTodo = async(id)=>{
    await deleteDoc(doc(db,'todos',id));
  }
   return (
    <div className={style.bg}>
        <div className={style.containers}>
          <h3 className={style.heading}> Todo App</h3>
            <form onSubmit={createtodo} className={style.form}>
                <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="'text" placeholder='Add todo'/>
                <button className={style.button}><AiOutlinePlus size={30}/></button>
            </form>
         <ul>
          {todos.map((todo,i)=>{
           return <Todo key={i} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
          })}
         </ul>
         {todos.length<1?null:  <p className={style.count}>You have {todos.length} todos</p>}
       
        </div>
    </div>
  );
}

export default App;
