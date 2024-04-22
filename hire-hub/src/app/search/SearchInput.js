"use client"
import React, {useState} from 'react'
import searchResult from './searchResult'
import Link from 'next/link'

const SearchInput = () => {
    const [resultArr, setResultArr] = useState([])

    async function getResult(searchTerm){
        let response = await searchResult(searchTerm)
        setResultArr(response)
    }
  return (
    <>
      <div className='flex items-center '>
      <input type="text" name="search" id="search" placeholder="Search for Users" className="search" onChange={(e) => getResult(e.target.value)}></input>
      </div>
      <div className='m-10'>
        {resultArr.map((element)=>{
          return(


      <div key={element._id} class="max-w-5xl mx-auto mt-8">
        <div class="border-l-2 border-gray-500 pl-8">
        <div class="flex flex-col md:flex-row md:justify-between">
            <div class="mb-4 md:mb-0">
                <h3 class="text-black text-xl font-bold mb-2"><Link href={`/applicants/public-profile/${element._id}`}>Name: {element.name}</Link></h3>
                <p class="text-black text-sm">City: {element.city}</p>
            </div>
            <p class="text-black">Email: {element.email}</p>
        </div>
        </div>
        </div>



          )
        })}
      </div>
    
    </>
  )
}

export default SearchInput