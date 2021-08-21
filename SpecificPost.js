import React,{useState} from 'react'
import moment from 'moment'
import '../../index.css'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { delatePost , updatePost} from '../../action';
import {NavLink,useHistory} from 'react-router-dom'
import FileBase from 'react-file-base64';


function SpecificPost(props) {
    const history = useHistory();
    const {existUser} = JSON.parse(localStorage.getItem('profile'));
    

    const dispatch = useDispatch();
    const _id = props.match.params.id;
    const data = useSelector((state)=>state.inputReducer);
    
    const specificProject = data.find((user)=>{
        return(user._id ===_id);
    })

    const delate = (id)=>{
        dispatch(delatePost(id));
        history.push('/posts');
        window.alert("File Delated!!");
        // history.push('/posts');
    }
    
    const[show,showPost] = useState(false);
    const[show1,showPost1] = useState(false);

    const[updata,setupData] = useState({
        title:"",subtitle:"",message:"",creator:"",tags:"",selectedFile:"",createdAt:""
    });
    const changeEvent = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setupData({
            ...updata,
            [name]:value,
            createdAt:new Date()
        });
  }
    const editEvent = (e)=>{
          e.preventDefault();  
          showPost1(!show1);
    }
    const edit = (e)=>{
          e.preventDefault();
          showPost1(!show1);
          showPost(!show);
          setupData({title:specificProject.title,subtitle:specificProject.subtitle,message:specificProject.message,creator:specificProject.creator,tags:specificProject.tags,selectedFile:specificProject.selectedFiel,createdAt:""});
    }
    const close = ()=>{
          showPost(!show);
    }
    const clearEvent = (x)=>{
          x.preventDefault();
          setupData({title:"",subtitle:"",message:"",creator:"",tags:"",selectedFile:"",createdAt:""});
    }
    const submitEvent=(e)=>{
          e.preventDefault();
          if(!updata.title || !updata.subtitle || !updata.message || !updata.creator || !updata.tags || !updata.selectedFile){
            window.alert("Not Enough Details!!");
            clearEvent(e);
          
        } else{
            dispatch(updatePost(_id,updata));
            window.alert("File Updated");
            close(e);
        }     
    }
    return (
        <div> 
             {!specificProject?<div style={{display:"flex",height:"88vh",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
             <h1 style={{color:"white"}}>File Deleted</h1>
             <NavLink exact to='/posts' className="btn" style={{textDecoration:"none"}}>Back</NavLink>
             </div>:
             <div className="specific_container">
             <div className="specific_img" style={{backgroundImage: `url(${specificProject.selectedFile})`}}>
                <div className="specific_details1">
                    <div>
                       <h1 className="dis_details1">{specificProject.creator}</h1>
                       <p className="dis_details1">{moment(specificProject.createdAt).fromNow()}</p>
                    </div>
                    {specificProject.creatorID===existUser._id?
                      <button className="btn2" onClick={editEvent}>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                    </button>:
                    null
                    }
                  
                    {show1?<div className="menu">
                          {/* <button className="btn3" onClick={()=>delate(specificProject._id)}>Edit</button> */}
                          <button className="btn3" onClick={edit}>Edit</button>
                          <button className="btn3" onClick={()=>delate(specificProject._id)}>Delete</button>
                    </div>:null}
                </div>
             </div>  
             <div className="specific_details2">
                 <p style={{margin:"0"}}>{specificProject.tags}</p>
                 <h2 className="dis_details2" style={{margin:"20px 0 20px 0"}}>{specificProject.title}</h2>
                 <h2 className="dis_details2">{specificProject.subtitle}</h2>
                 <p className="dis_details2">{specificProject.message}</p>
               <div className="control">
                    <NavLink exact to='/posts' className="btn3">Back</NavLink>
               </div>
             </div>
             {show? <div className="updatePosts">
                 <form>
                      <div style={{width:"100%",display:"flex", justifyContent:"space-between", alignContent:"center"}}>
                          <h1 style={{marginLeft:"5px"}}>Edit Post</h1>
                          <button onClick={close} className="btn3" style={{fontSize:"1.7rem",fontWeight:"bold",color:"red"}}>X</button>
                      </div>
                     <div className="input_holder">
                       <label htmlFor="title" className="input_label">Title</label>
                       <input type="text" name="title" onChange={changeEvent} placeholder="Title..." value={updata.title} id="title" />
                      </div>
                      <div className="input_holder">
                        <label htmlFor="subtitle" className="input_label">Sub-Title</label>
                        <input type="text" name="subtitle" onChange={changeEvent} placeholder="Sub-Title..." value={updata.subtitle} id="subtitle"/>    
                      </div>
                      <div className="input_holder">
                        <label htmlFor="message" className="input_label">Message</label>
                        <textarea type="text" className="text_area" value={updata.message} name="message" rows="7" placeholder="Description..." onChange={changeEvent} id="message"></textarea>    
                     </div>
                     <div className="input_holder">
                       <label htmlFor="creator" className="input_label">Creator</label>
                       <input type="text" name="creator" onChange={changeEvent} placeholder="Creator..." value={updata.creator} id="creator"/>
                     </div>
                     <div className="input_holder">
                       <label htmlFor="tags" className="input_label">Tags</label>
                       <input type="text" name="tags" onChange={changeEvent} placeholder="Tags..." value={updata.tags} id="tags"/>
                     </div>
                     <div className="input_holder">
                       <label htmlFor="tags" className="input_label">File</label>
                       <FileBase 
                       type="file"
                       multiple={false}
                       onDone={({base64})=>setupData({...updata,selectedFile:base64})}
                      />
                     </div>    
                      <div className="buttons">
                         <button className="btn" onClick={clearEvent} >Clear</button>
                         <button className="btn" onClick={submitEvent}>Update</button>
                      </div>
                  </form>
             </div>  :null}
        </div>}
        </div>
    )
}

export default SpecificPost
