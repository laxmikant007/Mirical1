import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBlogByCategory } from '../../../actions/blog.action';
import Blog from '../Blog'

/**
* @author
* @function CategoryBlogsPage
**/

const CategoryBlogsPage = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogByCategory(match.params.categoryId))
    },[dispatch, match.params.categoryId])

  return(
    <Blog loadAll={false} />
   )
  }


export default CategoryBlogsPage