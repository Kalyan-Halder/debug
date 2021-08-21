import React from 'react'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import '../index.css';
import {useDispatch} from 'react-redux'
import {delatePost,likePost} from '../action/index.js'
 
function Post(props) {
    let data,existUser;
    if((localStorage.getItem('profile'))){
      data = JSON.parse(localStorage.getItem('profile'));
      existUser = data.existUser;
    }
    
    const dispatch = useDispatch();
    const history = useHistory();

    const {post} = props;
     
    const viewEvent = (id)=>{
          history.push(`posts/${id}`);
    }
    const delate = (id)=>{
          dispatch(delatePost(id))
    }
    // const editPost = (id)=>{
    //       history.push(`posts/${id}`);
    // }
   
    return (
        <div className="post" onClick={()=>viewEvent(post._id)}>
             <div className="img" style={{backgroundImage: `url(${post.selectedFile})`}}>
                <div className="edit">
                    <div>
                       <h1 className="dis_details1">{post.creator}</h1>
                       <p className="dis_details1">{moment(post.createdAt).fromNow()}</p>
                    </div>
                    {/* <button className="btn2" onClick={()=>editPost(post._id)}>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                    </button> */}
                </div>
             </div>  
             <div className="discription">
                 <p style={{margin:"0"}}>{post.tags}</p>
                 <h2 className="dis_details2" style={{margin:"20px 0 20px 0"}}>{post.title}</h2>
                 <h3 className="dis_details2">{post.subtitle}</h3>
             </div>  
             <div className="control">
                 {/* <button className="btn3">{post.likeCount}</button> */}
                 {/* <NavLink exact to={'/posts/' + post._id} className="btn3">View</NavLink> */}
                 {/* <button className="btn3" onClick={(e)=>delate(post._id)}>Delete</button>
                  */}
                {post.creatorID===existUser._id?
                <div>
                <button className="btn3" onClick={(e)=>{e.stopPropagation()
                   delate(post._id)
                 }}>Delete</button>
                 <button className="btn3" onClick={(e)=>{e.stopPropagation()
                     console.log(post._id);
                    dispatch(likePost(post._id));
                 }}>Like {post.likeCount}</button>
                </div>:
                <div>
                <button className="btn3" onClick={(e)=>{e.stopPropagation()
                     console.log(post._id);
                    dispatch(likePost(post._id));
                 }}>Like {post.likeCount}</button>
                </div>
                }
             </div>
        </div>
    )
}

export default Post
