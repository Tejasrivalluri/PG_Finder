import { useState, useRef, useEffect } from "react";

const SearchBar = ({ search, setSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleToggle = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearch("");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', height: '60px' }}>
      <div className={`animated-search-wrapper ${isExpanded ? 'expanded' : ''}`}>
        {!isExpanded ? (
          <button className="search-icon-btn" onClick={handleToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        ) : (
          <>
            <span style={{ marginLeft: '1.5rem', opacity: 0.7, display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by PG name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="close-icon-btn" onClick={handleClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;