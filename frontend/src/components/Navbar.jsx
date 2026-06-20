import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  // Sync search input with URL if we are on the pgs page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
      setIsExpanded(true);
    } else if (location.pathname !== "/pgs") {
      setSearchQuery("");
      setIsExpanded(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pgs?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/pgs`);
    }
  };

  const handleToggle = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery("");
    if (location.pathname === "/pgs") {
      navigate("/pgs");
    }
  };

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
      {location.pathname !== '/pgs' ? (
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PG Finder
          </h2>
        </Link>
      ) : (
        <div style={{ width: '100px' }}></div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Global Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '40px' }}>
          <form onSubmit={handleSearchSubmit} className={`animated-search-wrapper ${isExpanded ? 'expanded' : ''}`} style={{ height: '100%', margin: 0, width: isExpanded ? '300px' : '40px', borderRadius: '20px' }}>
            {!isExpanded ? (
              <button type="button" className="search-icon-btn" onClick={handleToggle} style={{ padding: '0 10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            ) : (
              <>
                <span style={{ marginLeft: '1rem', opacity: 0.7, display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search city or PG..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                />
                <button type="button" className="close-icon-btn" onClick={handleClose} style={{ padding: '0 0.8rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </>
            )}
          </form>
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/pgs">View PGs</Link>
              <Link to="/favorites">Favorites</Link>
              <Link to="/my-bookings">My Bookings</Link>
              {user.role === 'OWNER' && (
                <Link to="/owner-dashboard" style={{ color: 'var(--accent)' }}>Owner Dashboard</Link>
              )}
              <a href="#" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;