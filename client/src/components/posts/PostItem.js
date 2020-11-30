import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ addLike, removeLike, deletePost, auth, post: { _id, user, avatar, author, content, likes, comments, date } }) => (
   <div class="post bg--white p-16 my-16">
      <div>
         <a href="profile.html">
            <img
               className="round-img"
               src={avatar}
               alt=""
            />
            <h4>{author}</h4>
         </a>
      </div>
      <div>
         <p className="my-16">{content}</p>
         <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
         </p>
         <button type="button" className="btn btn--light" onClick={() => addLike(_id)}>
            <i className="fas fa-thumbs-up"></i>
               <span>{likes.length > 0 && <span>{likes.length}</span>}
            </span>
         </button>
         <button type="button" className="btn btn--light" onClick={() => removeLike(_id)}>
            <i className="fas fa-thumbs-down"></i>
         </button>
         <Link to={`/post/${_id}`} className="btn btn--primary">
            Discussion {comments.length > 0 &&
               <span className='comment-count'>{comments.length}</span>
            }
         </Link>
         {
            !auth.loading && user === auth.user._id && (
               <button
                  onClick={() => deletePost(_id)}      
                  type="button"
                  className="btn btn--danger"
               >
                  <i className="fas fa-times"></i>
               </button>
            )
         }
      </div>
   </div>
)
const mapStateToProps = state => ({
   auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);