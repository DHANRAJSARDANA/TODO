import React from 'react'

export default function Task({todos,flag}) {
  return (
    <div >
        <h1 className='font-bold text-center text-xl py-4'>Your Todos</h1>
        <div id="todos " className='flex gap-2 flex-col flex-wrap   items-center'>
     {todos.map((todo)=>{
return( 
<div key={todo.id} className="container  bg-violet-100 p-2">
<h1 className='float-left'>{todo.todo}</h1>
<h2 className='float-right'>{todo.iscompleted?"completed":"Not Completed"}</h2>
</div>

)
     })}
    </div>     
    </div>
  )
}
