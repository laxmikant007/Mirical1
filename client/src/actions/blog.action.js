import axios from '../helpers/axios'
import { blogConstants } from './constants'

export const getAllBlogs = () => {
    return dispatch => {
        dispatch({ type: blogConstants.GET_ALL_BLOGS_REQUEST })
        const res = axios.get('/blogs');

        res.then(response => {
            if(response.status === 200) {
                dispatch({ type: blogConstants.GET_ALL_BLOGS_SUCCESS,
                    payload: { blogList: response.data }
                })
            }
        })

        res.catch(error => {
                dispatch({ type: blogConstants.GET_ALL_BLOGS_FAILURE,
                    payload: { error: error.response.data.error }
                })
        })
    }
}

export const getABlog = (blogId) => {
    return dispatch => {
        dispatch({ type: blogConstants.GET_A_BLOG_REQUEST })
        const res = axios.get(`/blog/${blogId}`);

        res.then(response => {
            if(response.status === 200) {
                dispatch({ type: blogConstants.GET_A_BLOG_SUCCESS,
                    payload: { blog: response.data }
                })
            }
        })

        res.catch(error => {
            dispatch({ type: blogConstants.GET_A_BLOG_FAILURE,
                payload: { error: error.response.data.error }
            })
        })
    }
}

export const getBlogByCategory = (categoryId) => {
    return dispatch => {
        dispatch({ type: blogConstants.GET_BLOG_BY_CATEGORY_REQUEST })
        const res = axios.get(`/blogs/category/${categoryId}`);

        res.then(response => {
            if(response.status === 200) {
                dispatch({ type: blogConstants.GET_BLOG_BY_CATEGORY_SUCCESS,
                    payload: { blogList: response.data }
                })
            }
        })

        res.catch(error => {
            dispatch({ type: blogConstants.GET_BLOG_BY_CATEGORY_FAILURE,
                payload: { error: error.response.data.error }
            })
        })
    }
}

export const getBlogUserDetails = (userId) => {
    return dispatch => {
        dispatch({ type: blogConstants.GET_BLOG_USER_REQUEST })
        const res = axios.get(`/user/profile/${userId}`);

        res.then(response => {
                dispatch({ type: blogConstants.GET_BLOG_USER_SUCCESS,
                    payload: { user: response.data }
                })
        })

        res.catch(error => {
            dispatch({ type: blogConstants.GET_BLOG_USER_FAILURE,
                payload: { error: error.response.data.error }
            })
        })
    }
}


export const getAllCategories = () => {
    return dispatch => {
        dispatch({ type: blogConstants.GET_ALL_CATEGORY_REQUEST })
        const res = axios.get('/categories')

        res.then(response => {
            dispatch({ type: blogConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: response.data }
            })
        })

        res.catch(error => {
            dispatch({ type: blogConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: error.response.data.error }
            })
        })
    }
}

export const postBlogComment = (commentData) => {
    const comment = {  name: commentData.name, text: commentData.text, email: commentData.email } 
    return dispatch => {
        dispatch({ type: blogConstants.COMMENT_REQUEST })
        const res = axios.post(`/blog/user/comment/${commentData.blogId}`,{ comment })

        res.then(response => {
                dispatch({ type: blogConstants.COMMENT_SUCCESS,
                    payload: { message: response.data.message, blog: response.data.updatedBlog }
                })
        })

        res.catch(error => {
            dispatch({ type: blogConstants.COMMENT_FAILURE,
                payload: { error: error.response.data.error }
            })
        })
    }
}