/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageTitle from "../../../Components/UI/PageTitle";
import "./BlogPg.css";
// import blogImg from "../../../img/blog-img.webp";
import { useDispatch, useSelector } from "react-redux";
import { getABlog, postBlogComment } from "../../../actions";
import Quotes from "randomquote-api";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { api } from "../../../urlConfig";
import dompurify from 'dompurify';

/**
 * @author
 * @function Blog
 **/

const BlogPg = ({ match }) => {

  const randomquote = Quotes.randomQuote(); // TO generate random quotes at blockquote
  const sanitizer = dompurify.sanitize; // DOM Purify to prevent XSS Attack because of dangerouslysethtml
  
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  // States for managing Comment POST
  const [commentValues, setCommentValues] = useState({
    commentText: "",
    commentName: "",
    commentMail: "",
  });

  const { commentText, commentName, commentMail } = commentValues;

  const handleChange = (name) => (event) => {
    setCommentValues({ ...commentValues, [name]: event.target.value });
  };

  const submitComment = (e) => {
    e.preventDefault();

    const commentData = {
      blogId: match.params.blogId,
      name: commentName
        ? commentName.charAt(0).toUpperCase() + commentName.slice(1)
        : "Anonymous",
      text: commentText,
      email: commentMail,
    };

    dispatch(postBlogComment(commentData));
    setCommentValues({ commentName: "", commentText: "", commentMail: "" });
  };


  // Fetching Data from Databse On Component Load
  useEffect(() => {
    dispatch(getABlog(match.params.blogId));
  }, [dispatch, match.params.blogId, blogs.message]);

  const renderBlog = () => {
    if (blogs.blog) {
      
      const { date, title, content, comments, author, tags } = blogs.blog;  // Destructuring Blog Details
      let shareUrl = `https://miracle-solutions.herokuapp.com${match.url}`; // Url For Sharing blog

      return blogs.error ? <h3 className="alert-danger p-5"> {blogs.error} </h3> : 
      (
        <div className="blog-content">
          <div className="post standard-format-image">
            <h1 className="text-center"> {title} </h1>

            <div 
              className="main-blog-text-div mt-5"
              dangerouslySetInnerHTML={{__html: sanitizer(content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']} )}}  
            >
            {/* <div className="entry-media">
              <img src={blogImg} alt="Blog Head" />
            </div>
            {content} */}
            </div>

            <div className="date-entry-meta text-right">
              <div className="entry-meta">
                <span>{date} </span>
                <span> By: <a href={`/blogs/user/${author._id}`}> {author.firstName} </a> </span>
              </div>
            </div>
            <blockquote>
              {randomquote.quote}
              <span className="quoter">- {randomquote.author}</span>
            </blockquote>
          </div>
          <div className="tag-share clearfix">
            <div className="tag">
              <ul>
                {tags.map((tag, index) => {
                  return <li key={index}> {tag} </li>;
                })}
              </ul>
            </div>
            <div className="share">
              <ul>
                <li>
                  <FacebookShareButton
                    quote={`Check Out This Latest Blog On ${title} By ${author.firstName}`}
                    url={shareUrl}
                    children={ <a> <i className="fab fa-facebook-f" /> </a> }
                  />
                </li>
                <li>
                  <TwitterShareButton
                    url={shareUrl}
                    children={ <a> <i className="fab fa-twitter" /> </a> }
                  />
                </li>
                <li>
                  <LinkedinShareButton
                    title={title}
                    summary={`Check Out This Latest Blog On ${title} By ${author.firstName}`}
                    url={shareUrl}
                    children={ <a> <i className="fab fa-linkedin-in" /> </a> }
                  />
                </li>
                <li>
                  <WhatsappShareButton
                    url={shareUrl}
                    children={<a> <i className="fab fa-whatsapp" /> </a> }
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="author-box">
            <div className="author-avatar">
              <img
                src={`${api}/user/profile/image/${author._id}`}
                // src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2NUU0MDFENTE0MjExRUFCNTEzQjgyRDlGMjgwN0NFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2NUU0MDFDNTE0MjExRUFCNTEzQjgyRDlGMjgwN0NFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0I2N0E5NjNCM0ExMUVBQUEyODlCQUJDQkUxNUI5RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0I2N0E5NzNCM0ExMUVBQUEyODlCQUJDQkUxNUI5RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYI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"
                alt="Profile"
              ></img>
            </div>
            <div className="author-content">
              <div className="author-name">
                <a href={`/blogs/user/${author._id}/${author.firstName}${author.lastName ? '-' + author.lastName : ''}`}>{`${author.firstName} ${author.lastName}`}</a>
              </div>
              <p>
                {author.funFact}
              </p>
              <div className="socials">
                <ul className="social-link">
                  {author.socialLinks.Facebook ?
                    <li>
                      <a href={author.socialLinks.Facebook} target="_blank" rel="noreferrer noopener">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li> : ''}

                  {author.socialLinks.Twitter ?
                    <li>
                      <a href={author.socialLinks.Twitter} target="_blank" rel="noreferrer noopener">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li> : ''}

                  {author.socialLinks.Linkedin ?
                    <li>
                      <a href={author.socialLinks.Linkedin} target="_blank" rel="noreferrer noopener">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li> : ''}

                  {author.socialLinks.Instagram ?
                    <li>
                      <a href={author.socialLinks.Instagram} target="_blank" rel="noreferrer noopener">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li> : ''}


                </ul>
              </div>
            </div>
          </div>

          <div className="comments-area">
            <div className="comments-section">
              <h3 className="comments-title">{comments.length} Comments</h3>
              {comments.length === 0 ? <h3 className="text-center mt-3 text-success empty-comment-section">Be The First One To Put Your Thoughts Here!</h3> :
                <ol className="comments">
                  {comments.map((comment, index) => {
                    return (
                      <li key={index} className="comment">
                        <div className="complete-comment-div">
                          <div className="comment-image">
                            <img
                              src={`${api}${process.env.REACT_APP_DEFAULT_IMG}`}
                              // src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCODk2QUMzNTE0MjExRUE4OTM1RTRERUJGOTkwRkNCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCODk2QUMyNTE0MjExRUE4OTM1RTRERUJGOTkwRkNCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0I2N0E5NjNCM0ExMUVBQUEyODlCQUJDQkUxNUI5RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0I2N0E5NzNCM0ExMUVBQUEyODlCQUJDQkUxNUI5RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYI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"
                              alt=" "
                            />
                          </div>
                          <div className="comment-wrapper">
                            <h4>
                              {/* If Email exist render name with email otherwise render only name */}
                              {comment.email ? (
                                <a href={`mailto:${comment.email}`}>
                                  {comment.name}
                                </a>
                              ) : (
                                comment.name
                              )}
                              <span className="comments-span ml-2">says:</span>
                            </h4>
                            <p>{comment.text} </p>
                            {/* <div className="comments-reply">
                                <a className="comment-reply-link" href="/blog">
                                   <i className="fas fa-reply"></i>
                                      Reply
                                    </a>
                                </div> 
                          */}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>}

            </div>
            {blogs.commentError ? (
              <h5 className="alert-danger p-3"> {blogs.commentError} </h5>
            ) : blogs.message ? (
              <h5 className="alert-success p-3"> {blogs.message} </h5>
            ) : (
              ""
            )}
            <div className="comment-respond">
              <h3 className="comment-reply-title">
                Express Your Thoughts Here{" "}
              </h3>
              <form className="comment-form">
                <div className="form-textarea">
                  <textarea
                    id="comment"
                    rows="9"
                    placeholder="Write Your Comments..."
                    value={commentText}
                    onChange={handleChange("commentText")}
                    required
                  />
                </div>
                <div className="form-inputs">
                  <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <input
                        placeholder="Name"
                        type="text"
                        value={commentName}
                        onChange={handleChange("commentName")}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <input
                        placeholder="Email"
                        type="email"
                        value={commentMail}
                        onChange={handleChange("commentMail")}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="form-submit">
                  <button
                    onClick={submitComment}
                    type="submit"
                    className="btn"
                    id="submitComment"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <PageTitle
        title="Blog Post"
        para="Have Fun Reading This Amazing Blog Post"
      />
      <section className="blog-details-section section-padding">
        <Container>
          <Row>
            <Col className="col blog-render-area" lg={12} xs={12}>
              {blogs.loading ? (
                <h3 className="alert-info p-5">Loading...</h3>
              ) : (
                renderBlog()
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogPg;
