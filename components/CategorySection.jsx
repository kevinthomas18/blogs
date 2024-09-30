import Link from "next/link";
import React from "react";

function CategorySection({categories}) {
    console.log(categories);
  return (
    <>
   
      <div className="w-full my-10  rounded flex flex-wrap text-center gap-y-3 gap-x-5">
        {categories?.map((category)=>{
            return(
                <Link href={`/blogs/category/${category.id}/${category.slug}`} key={category?.id} className="px-2 py-2 bg-gray-200 rounded text-black">{category.name}</Link>
            )
        })}
       
      
      </div>
    </>
  );
}

export default CategorySection;
