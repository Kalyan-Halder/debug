import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {NavLink,useHistory} from "react-router-dom"
import {userDetails} from '../action/auth.js';
import '../index.css'


function Nav() {

    const history = useHistory();
    const dispatch = useDispatch();

    const data = useSelector((state)=>state.inputReducer);
    const count = data.length;
    let auth = localStorage.getItem('profile');

    useEffect(()=>{
          dispatch(userDetails());
     },[dispatch]);
 
    const logout = (e)=>{
      e.preventDefault();
      history.push("/login");
      localStorage.removeItem('profile');
   }
   
   console.log(auth);
    return (
        <div className="nav">
             <div className="logo">
                 <h1>Post Creator</h1>
             </div>
             {auth?
                <div className="link">
                 <NavLink exact activeClassName="active" className="links"  to="/">Home</NavLink>
                 <NavLink activeClassName="active" className="links"  to="/create">Create</NavLink>
                 <NavLink  activeClassName="active" className="links" to="/posts" >Posts{count>0?
                 <span>({count})</span>:
                 <span>{null}</span>
                 }</NavLink>
                 <button className="btn" onClick={logout}>Logout</button>
               </div>:
               <div className="link">
                 <NavLink exact activeClassName="active" className="links" to="/signup">Signup</NavLink>
                 <NavLink exact activeClassName="active" className="links" to="/login">Login</NavLink>
               </div>
               }   
        </div>
    )
}

export default Nav
