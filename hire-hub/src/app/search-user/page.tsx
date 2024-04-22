"use client"

import { useState } from 'react';
import axios from 'axios';
import NavSigned from '@/components/NavSigned';
import extra from '@/style/extra.module.css';
import Link from 'next/link';

interface Job {
  role : string
  company : string
}


const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/search-user', {
        params: {
          search: searchTerm,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (

    <>
    <title>User Search</title>
    <NavSigned />

    <div className="min-h-screen flex flex-col gap-2 bg-gradient-to-r text-black bg-clip-text animate-gradient">
    <div>
      <div className='flex flex-row justify-center mt-3 p-3'>
        <div className='mt-3'>
        <input
          type="text" name="search" id="search" placeholder="Search for Users" className="search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        /></div>
        <button className={extra.complaint} onClick={handleSearch}>Search</button>
      </div>
      <div>

      <div className="flex justify-center text-black text-4xl font-semibold rounded-lg shadow-lg bg-emerald-100 p-6  ml-3 mt-3 mr-3">
         <h2>Search Results</h2></div>
        
        <ul>
          {searchResults.map((user: any) => (
            <div className="text-black rounded-lg shadow-lg bg-emerald-100 p-6  ml-3 mt-3 mr-3">
                    <div style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}>
            <li key={user._id}>
              <Link href={`recruiter/public-profile/${user._id}`}><p className="text-xl text-black font-semibold p-1">{user.name}</p></Link>

              <h1 className="text-xl text-black font-semibold p-1">{renderJobs(user.job)} |{renderOrgan(user.job)}</h1>

              <p className="text-xl text-blackp p-1">Email: {user.email}</p>
              <p className="text-xl text-blackp p-1">City: {user.city}</p>
              <p className="text-xl text-blackp p-1">Country: {user.country}</p>
              <p className="text-xl text-blackp p-1">Contact No: {user.number}</p>

            </li>
            </div>
            </div>

          ))}
        </ul>
      </div>
    </div>

    </div>

    </>
  );
};

export default SearchPage;


function renderJobs(jobs: (string | Job)[]) {
  return jobs.map((job) => {
    if (typeof job === "string") {
      return job;
    } else {
      return job.role;
    }
  }).join(", ");
}

function renderOrgan(jobs: (string | Job)[]) {
  return jobs.map((job) => {
    if (typeof job === "string") {
      return job;
    } else {
      return job.company;
    }
  }).join(", ");
}

