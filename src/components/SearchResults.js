import { useState, useEffect } from 'react';

export const SearchResults = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsError, setSearchResultsError] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    let searchHistoryLocalStorage = localStorage.getItem('searchHistory')
      ? JSON.parse(localStorage.getItem('searchHistory'))
      : [];

    if (props.searchHistory.length > 0) {
      const afterFilter = searchHistoryLocalStorage.filter((item) => {
        return item.startsWith(props.searchHistory);
      });

      if (afterFilter.length > 0) {
        setSearchHistory(afterFilter.splice(0, 5));
      } else {
        setSearchHistory(searchHistoryLocalStorage.splice(0, 5));
      }

      setSearchResultsLoading(true);
      fetch(`https://api.github.com/search/users?q=${props.searchHistory}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.items);
          setSearchResultsLoading(false);
        })
        .catch((error) => {
          searchResultsError(true);
          setSearchResultsLoading(false);
        });
    } else {
      setSearchResultsError(true);
      setSearchResults([]);
    }
  }, [props.searchHistory, searchResultsError]);

  return (
    <div className="search-results">
      <div
        className="search-results-wrapper"
        style={{
          position: 'absolute',
          top: '64px',
          left: '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {searchResultsLoading && <p>Loading...</p>}

        {searchResultsLoading !== true &&
          searchResultsError &&
          searchResults === undefined && <p>Something went wrong!</p>}

        {searchHistory.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                padding: '10px',
              }}
            >
              History: {item}{' '}
            </div>
          );
        })}

        {searchResultsLoading !== true && searchResults !== undefined && (
          <div>
            {searchResults.splice(0, 5).map((user) => (
              <li key={user.id}>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  {user.login}
                </a>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
