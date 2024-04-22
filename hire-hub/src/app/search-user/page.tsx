"use client"

import { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>User Search</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter search term..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((user: any) => (
            <li key={user._id}>
              <span>{user.name}</span>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
