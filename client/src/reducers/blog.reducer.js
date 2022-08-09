/* eslint-disable import/no-anonymous-default-export */
import { blogConstants } from '../actions/constants';

const initState = {
    loading: '',
    error: '',
    message: '',
    blogList: [],
    commentError: '',
    blogCategories: [],
    blog: {
        date: '',
        comments: [],
        tags: [],
        _id: '',
        title: '',
        slug: '',
        content: '',
        author: {
            _id: '',
            fistName: '',
            lastName: '',
            funFact: '',
            socialLinks: {}
        },
        category: {
            _id: '',
            name: ''
        }
    }
}

export default (state = initState, action) => {
    switch(action.type) {

        // All Request action constants
        case blogConstants.GET_ALL_BLOGS_REQUEST: 
        case blogConstants.GET_BLOG_BY_CATEGORY_REQUEST:
        case blogConstants.GET_BLOG_BY_USER_REQUEST:
        case blogConstants.GET_ALL_CATEGORY_REQUEST:
        case blogConstants.GET_A_BLOG_REQUEST:
        case blogConstants.COMMENT_REQUEST:    
            state = {
                ...state,
                loading: true
            }
        break;

        case blogConstants.GET_ALL_BLOGS_SUCCESS:
        case blogConstants.GET_BLOG_BY_CATEGORY_SUCCESS:
        case blogConstants.GET_BLOG_BY_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                blogList: action.payload.blogList
            }
        break;

        case blogConstants.GET_ALL_BLOGS_FAILURE:
        case blogConstants.GET_BLOG_BY_CATEGORY_FAILURE:
        case blogConstants.GET_BLOG_BY_USER_FAILURE:    
        case blogConstants.GET_ALL_CATEGORY_FAILURE:    
        case blogConstants.GET_A_BLOG_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break;

        case blogConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                blogCategories: action.payload.categories,
            }
        break;

        case blogConstants.GET_A_BLOG_SUCCESS:
            state = {
                ...state,
                loading: false,
                blog: action.payload.blog
            }
        break;

        case blogConstants.COMMENT_SUCCESS:
            state = {
                ...initState,
                loading: false,
                commentError: false,
                message: action.payload.message,
                blog: action.payload.blog
            }
        break;

        case blogConstants.COMMENT_FAILURE:
            state = {
                ...state,
                loading: false,
                message: false,
                commentError: action.payload.error
            }
        break;

        case blogConstants.GET_BLOG_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case blogConstants.GET_BLOG_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                user: action.payload.user
            }
        break;

        case blogConstants.GET_BLOG_USER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break;

        default: return state;
    }
    return state;
}