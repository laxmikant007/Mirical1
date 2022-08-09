/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './UserBlogs.css'
import '../Blog/Blog.css'
import { Container, Row, Col } from 'react-bootstrap';
import blogDefault from "../../../img/blog-default.jpg";
import BlogList from "../../../Components/UI/Blog/BlogList";
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../urlConfig';
import { followRequest, unfollowRequest } from '../../../actions/user.action';
import ModalComp from '../../../Components/UI/Modal';
import { getBlogUserDetails } from '../../../actions/blog.action';
import { toast } from 'react-toastify';

/**
* @author
* @function UserBlogsProfile
**/

const UserBlogsProfile = ({ match }) => {

  const toastId = React.useRef(null);

  const dispatch = useDispatch();
  const blog = useSelector(state => state.blogs);
  const auth = useSelector(state => state.auth);
  const [largeScreen, setLargeScreen] = useState(true);
  let author = "";
  let loggedInUser = JSON.parse(localStorage.getItem("user"));

  // Modal State
  const [show, setShow] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const handleClose = () => {
    setShowFollowers(false)
    setShowFollowing(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const handleFollowerShow = () => setShowFollowers(true);
  const handleFollowingShow = () => setShowFollowing(true);

  const changeScreenElements = () => {
    if (window.screen.width < 736) {
      setLargeScreen(false)
    } else if (window.screen.width > 736) {
      setLargeScreen(true)
    }
  }

  const sendFollowRequest = (authorId, authorName, authorUserName) => {
    if (!auth.user._id) {
      handleShow()
    } else {
      const authorBody = { _id: JSON.parse(authorId), fullName: authorName, user_name: authorUserName }
      dispatch(followRequest(auth.user._id, authorBody))
      loggedInUser.followings.push(authorBody);
      localStorage.setItem("user", JSON.stringify(loggedInUser)) // Saving user back in Local Storage
      }
  }

  const sendUnfollowRequest = (authorId) => {
    const authorBody = { _id: JSON.parse(authorId) }
    dispatch(unfollowRequest(auth.user._id, authorBody))

    for(let i = 0; i < loggedInUser.followings.length; i++) {
      let loggedInUserFollowingsId = JSON.stringify(loggedInUser.followings[i]._id)
      if(loggedInUserFollowingsId === authorId) {
        loggedInUser.followings.splice(i,1);
        localStorage.setItem("user", JSON.stringify(loggedInUser)) // Saving user back in Local Storage
        break;
      }
    }

  }

  const checkFollowButtonRender = (authorId, authorName, authorUserName, authorFollowers) => {
    let isFollowing = false; // To Check Follow Button Condition
    let loggedInUserId = JSON.stringify(auth.user._id); // LoggedInUserId
    authorId = JSON.stringify(authorId);

    if (authorFollowers && authorFollowers.length !== 0) {
      for (let i = 0; i < authorFollowers.length; i++) {
        let authorFollowersId = JSON.stringify(authorFollowers[i]._id);

        // Check If The LoggedIn User Is Already In Profile Page User Followers List
        if (authorFollowersId === loggedInUserId) {
          isFollowing = true;
          break;
        }
      }
    }

    if (loggedInUserId && authorId === loggedInUserId) {
      return <button className="button btn followed-btn"><a href="/user/profile">Edit Profile &nbsp; <i className="fas fa-user"></i></a></button>
    }

    if (!auth.user._id || !isFollowing) {
      return <button onClick={() => { sendFollowRequest(authorId, authorName, authorUserName) }} className="btn btn-primary">Follow</button>
    } else if (isFollowing) {
      return <button onClick={() => { sendUnfollowRequest(authorId) }} className="btn followed-btn">Following &nbsp; <i className="fas fa-check"></i></button>
    }
  }

  // To Render Remove Following Button Only On Logged In User
  const checkRemoveButtonRender = (authorId, userId, userFullName, userName) => {
    if(loggedInUser) {
      let isFollowing = false; // To Check Follow Button Condition
      let isMyProfile = false; // To Check Same Profile Button Condition
      let loggedInUserId = JSON.stringify(auth.user._id);  // LoggedInUserId
      let loggedInUserFollowings = loggedInUser.followings; // LoggedInUser Followings List
      authorId = JSON.stringify(authorId); // Id Of Profile Page User
      userId = JSON.stringify(userId); // Id Of Following's User List 
  
      if (loggedInUserFollowings && loggedInUserFollowings.length !== 0) {
        for (let i = 0; i < loggedInUserFollowings.length; i++) {
          let loggedInUserFollowingId = JSON.stringify(loggedInUserFollowings[i]._id);
        //  console.log(loggedInUserFollowingId, userId)
          // Check If The LoggedIn User Is Already In Profile Page User Followers List
          if (loggedInUserFollowingId === userId) {
            isFollowing = true;
            break;
          }
          if (userId === loggedInUserId) {
            isMyProfile = true;
            break;
          }
        }
      }
  
      if (isMyProfile) {
        return  
      }
     
      if (!auth.user._id || !isFollowing) {
        return <button onClick={() => { sendFollowRequest(userId, userFullName, userName) }} className="btn btn-primary">Follow</button>
      } else if (isFollowing) {
        return <button onClick={() => { sendUnfollowRequest(userId) }} className="btn remove-btn">Following</button>
      }
  
    }
  }

  const renderLargeScreenElements = (fullName, funFact, totalBlogs, followersCount, followingsCount) => {
    return (
      <>
        {/* Display For Large Devices */}
        <div className="user-profile-info-details large">
          <ul>
            <li> <span> {totalBlogs} </span> <a>Blogs</a>  </li>
            <li onClick={handleFollowerShow}> <span> {followersCount} </span> <a>Followers</a> </li>
            <li onClick={handleFollowingShow}> <span> {followingsCount} </span> <a>Following</a> </li>
          </ul>
        </div>
        <div className="user-profile-info-name large">
          <h1> {fullName} </h1>
          <br />
          <span> {funFact} </span>
        </div>
      </>
    )
  }

  const renderSmallScreenElements = (fullName, funFact, totalBlogs, followersCount, followingsCount) => {
    return (
      <>
        {/* Display For Small Devices */}
        <div className="user-profile-info-name small">
          <h1> {fullName} </h1>
          <br />
          <span> {funFact} </span>
        </div>
        <div className="user-profile-info-details small">
          <ul>
            <li> <span> {totalBlogs} </span> <a>Blogs</a>  </li>
            <li onClick={handleFollowerShow}> <span> {followersCount} </span> <a>Followers</a> </li>
            <li onClick={handleFollowingShow}> <span> {followingsCount} </span> <a>Following</a> </li>
          </ul>
        </div>
      </>
    )
  }

  useEffect(() => {

    dispatch(getBlogUserDetails(match.params.userId));
    changeScreenElements();

  }, [dispatch, match.params.userId, auth.message, auth.error])

  const checkBlogThumbnail = (content) => {

    let div = document.createElement('div');
    div.innerHTML = content;
    let firstImage = div.getElementsByTagName('img')[0]
    let ImgSrc = firstImage ? firstImage.getAttribute("src") : blogDefault;
    return ImgSrc;
  }

  const renderUserBlogList = () => {
    author = blog.user;
    return (
      author.blogs.map((data, index) => {
        const { _id, date, title, content, description, slug } = data;
        return (
          <Col lg={6} xs={12}>
            <BlogList
              key={index}
              id={index}
              date={date}
              blogThumbnail={checkBlogThumbnail(content)}
              heading={title}
              content={description}
              link={`/blog/${_id}/${slug}`}
            />
          </Col>
        );
      })
    )
  }

  const renderUserDetails = () => {
    if (blog.user) {
      // Destructring user details
      const { _id, firstName, lastName, user_name, funFact, followers, followings, blogs } = blog.user;
      let fullName = `${firstName} ${lastName}`;
      let totalBlogs = blogs.length;
      let followersCount = followers.length;
      let followingsCount = followings.length;
      return (
        <Row className="user-profile-info-row">
          <Col lg={4} md={4} xs={3}>
            <div className="user-profile-image-div">
              <div className="user-profile-image">
                <img
                  src={`${api}/user/profile/image/${_id}`}
                  alt="Profile" />
              </div>
            </div>
          </Col>

          <Col lg={8} md={8} xs={9}>
            <div className="user-profile-info-div">
              <div className="user-profile-info">
                <div className="user-profile-info-username">
                  <h2> {user_name} </h2>
                  {/* Passing Id And Followers List Of Author */}
                  {checkFollowButtonRender(_id, fullName, user_name, followers)}
                </div>
                {largeScreen ? renderLargeScreenElements(fullName, funFact, totalBlogs, followersCount, followingsCount) : ''}
              </div>
            </div>
          </Col>

          {!largeScreen ? renderSmallScreenElements(fullName, funFact, totalBlogs, followersCount, followingsCount) : ''}

          <div className="user-profile-blog-list">
            {renderUserBlogList()}
          </div>
        </Row>
      )
    }
  }

  // To Show Text After Follow Request
  if (auth.loading) {
    toastId.current = toast.info("❕ Loading...", { autoClose: false })
  }
  if (auth.message) {
    toast.dismiss(toastId.current);
    toast.success(`✔ ${auth.message}`, { autoClose: 2000 })
    auth.message = "";
  } else if (auth.error) {
    toast.dismiss(toastId.current);
    toast.error(`❌ ${auth.error}`, { autoClose: 2000 })
    auth.error = "";
  }

  return (
    <>
      <ModalComp
        props={{ show: show, onHide: handleClose }}
        title="Login Required"
        body={
          <>
            Sorry, You need to Login to follow someone!
            <br />
            <hr />
            <div className="d-flex justify-content-between">
              <a href="/user/login"> Login Here</a> OR <a href="/user/signup">Signup Here</a>
            </div>
          </>
        }
      />

      <ModalComp
        props={{ show: showFollowers, onHide: handleClose, centered: true, className: "user-follow-list-modal" }}
        title="Followers List"
        body={
          <>
            {blog.user && blog.user.followers.map((followers, index) => {
              return (
                <li key={index} className="userFollowerList">
                  <div className="user-followers-info">
                    <a href={`/blogs/user/${followers._id}/${followers.fullName.includes(" ") ? followers.fullName.split(' ').join('-') : followers.fullName}`}>
                      <img src={`${api}/user/profile/image/${followers._id}`} alt="Profile" />
                    </a>
                    <span>
                    <a href={`/blogs/user/${followers._id}/${followers.fullName.includes(" ") ? followers.fullName.split(' ').join('-') : followers.fullName}`}>
                      <p style={{ color: "#000" }}> {followers.user_name} </p>
                    </a>
                      <p style={{ color: "#8e8e8e" }}> {followers.fullName} </p>
                    </span>
                  </div>
                  <div> {checkRemoveButtonRender(blog.user._id, followers._id, followers.fullName, followers.user_name)} </div>
                </li>
              )
            })}
          </>
        }
      />

      <ModalComp
        props={{ show: showFollowing, onHide: handleClose, centered: true, className: "user-follow-list-modal" }}
        title="Following List"
        body={
          <>
            {blog.user && blog.user.followings.map((following, index) => {
              return (
                <li key={following._id} className="userFollowerList">
                  <div className="user-followers-info">
                    <a href={`/blogs/user/${following._id}/${following.fullName.includes(" ") ? following.fullName.split(' ').join('-') : following.fullName}`}>
                      <img src={`${api}/user/profile/image/${following._id}`} alt="Profile" />
                    </a>
                    <span>
                    <a href={`/blogs/user/${following._id}/${following.fullName.includes(" ") ? following.fullName.split(' ').join('-') : following.fullName}`}>
                      <p style={{ color: "#000" }}> {following.user_name} </p>
                    </a>
                      <p style={{ color: "#8e8e8e" }}> {following.fullName} </p>
                    </span>
                    
                  </div>
                  <div> {checkRemoveButtonRender(blog.user._id, following._id, following.fullName, following.user_name)} </div>
                  {/* <div> <button className="btn remove-btn">Remove</button> </div>  */}
                </li>
              )
            })}
          </>
        }
      />

      <section className="blog-pg-section user-profile-blogs section-padding">
        <Container>
          <div className="blog-content">

            {blog.loading ? <h3 className="alert-info p-5">Loading...</h3> :
              renderUserDetails()}
          </div>
        </Container>
      </section>
    </>
  )
}


export default UserBlogsProfile