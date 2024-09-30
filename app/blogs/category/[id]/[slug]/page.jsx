import CategoryContainer from '@/components/CategoryContainer';
import { allBlogs, getCategoryBasedBlogs } from '@/utils/actions';
import React from 'react'

async function Category({params}) {
  
  const getCategoryDetails=await getCategoryBasedBlogs(params.id,params.slug);
  console.log(getCategoryDetails.data);
  return (
    <>
     <CategoryContainer category={getCategoryDetails.data} title="All Categories" /> 
    </>
  )
}

export default Category
