"use client"
import React, {useState} from 'react'
import searchResult from './searchResult'

const SearchInput = () => {
    const [resultArr, setResultArr] = useState([])

    async function getResult(searchTerm){
        let response = await searchResult(searchTerm)
        setResultArr(response)
    }
  return (
    <>
      <div className='text-center'>
        <input
          type="text"
          name="search"
          id="search"
          className="shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none"
          placeholder="Search...."
          onChange={(e) => getResult(e.target.value)} 
          />
        <button
          className="p-2 text-white bg-orange-500 hover:cursor-pointer" onClick={getResult}
          >
          Search
        </button>
      </div>
      <div className='m-10'>
        {resultArr.map((element)=>{
          return(
            <ul key={element._id} className='flex justify-center'>
              <li className="flex-1 text-black">{element.username}</li>
              <li className="flex-1 text-black">{element.email}</li>
              <li className="flex-1 text-black">{element.password}</li>
              <li className="flex-1 text-black">{element.city}</li>
            </ul>
          )
        })}
      </div>
    
    </>
  )
}

export default SearchInput