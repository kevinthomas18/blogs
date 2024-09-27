import CategoryContainer from '@/components/CategoryContainer';
import { allBlogs } from '@/utils/actions';
import React from 'react'

async function Category() {
  const blogs = await allBlogs();
  return (
    <>
     <CategoryContainer category={blogs.data} title="All Categories" /> 
    </>
  )
}

export default Category
