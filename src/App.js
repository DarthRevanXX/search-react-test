import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { SearchResults } from './components/SearchResults';

function App() {
  const [searchHistory, setSearchHistory] = useState('');
  const [focus, setFocus] = useState(false);

  const searchBarRef = React.createRef();

  useEffect(() => {
    let localStorageSearchHistory = [];
    if (localStorage.getItem('searchHistory')) {
      localStorageSearchHistory = localStorage.getItem('searchHistory')
        ? JSON.parse(localStorage.getItem('searchHistory'))
        : [];
    }

    localStorageSearchHistory.push(searchHistory);

    const localStorageSearchHistoryWithoutDuplicates = [
      ...new Set(localStorageSearchHistory),
    ];

    localStorage.setItem(
      'searchHistory',
      JSON.stringify(localStorageSearchHistoryWithoutDuplicates)
    );
  }, [searchHistory]);

  return (
    <div className="App">
      <header
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '64px',
          zIndex: '50',
          backgroundColor: '#FF8900',
        }}
      >
        <div
          className="header-wrapper"
          style={{
            height: '100%',
            width: '100%',
            maxWidth: '1440px',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className="search-bar"
            style={{
              width: '420px',
              height: '38px',
            }}
            ref={searchBarRef}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          >
            <div
              className="input-wrapper"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '95%',
                height: '100%',
                paddingRigth: '5%',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF',
                zIndex: '1',
              }}
            >
              <input
                spellCheck="true"
                placeholder="Search name, job or keyword"
                style={{
                  border: 'none',
                  background: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  flex: '1 1 0%',
                  fontSize: '17px',
                  color: 'rgb(28,34,39)',
                  lineHeight: 'normal',
                }}
                onChange={(e) => {
                  setSearchHistory(e.target.value);
                }}
              ></input>

              {focus && (
                <SearchResults searchHistory={searchHistory}></SearchResults>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
