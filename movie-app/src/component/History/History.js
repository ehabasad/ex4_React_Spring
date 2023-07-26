import React from 'react';

const History = ({ searchHistory, performSearch }) => {
  const handleSearch = (search) => {
    performSearch(search);
  };

  const handleClearHistory = () => {
    // Logic to clear search history
  };

  const handleDeleteItem = (index) => {
    // Logic to delete a specific search history item
  };

  return (
    <div>
      <h2>Search History</h2>
      {searchHistory.length > 0 ? (
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>
              <button onClick={() => handleSearch(search)}>{search}</button>
              <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history available</p>
      )}
      <button onClick={handleClearHistory}>Clear History</button>
    </div>
  );
};

export default History;
