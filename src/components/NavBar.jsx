import React from 'react'
import {Link, NavLink} from 'react-router-dom'
export default function NavBar() {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-2 '>
    <div className="logo">
        <Link to="/todo" className='font-bold text-xl px-9'>TODO</Link>
    </div>
    <ul className="flex gap-8 px-9">
<NavLink  className={ (e)=>{return e.isActive?"cursor-pointer font-bold ":"cursor-pointer hover:font-bold transition-all"}} to="/" >Logout</NavLink>
<NavLink className={(e)=>{return e.isActive?'cursor-pointer font-bold':"cursor-pointer hover:font-bold transition-all"}} to='/task'>Your Tasks</NavLink>
    </ul>
    </nav>
  )
}
