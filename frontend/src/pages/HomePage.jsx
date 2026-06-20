import { Link } from "react-router-dom";

function HomePage() {
  const user = localStorage.getItem("user");

  return (
    <div style={{ marginTop: '2rem' }}>
      
      {/* Hero Section */}
      <section className="text-center" style={{ marginBottom: '5rem', padding: '4rem 2rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Find Your Perfect PG</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Discover the best paying guest accommodations in your city with premium amenities, affordable prices, and verified owners.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/pgs">
            <button style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Browse PGs</button>
          </Link>
          {!user && (
            <Link to="/register">
              <button style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'transparent', border: '1px solid var(--primary)' }}>
                Get Started
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 className="text-center" style={{ marginBottom: '3rem' }}>Why Choose PGFinder?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="pg-card" style={{ textAlign: 'center', cursor: 'default' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️</h3>
            <h3 style={{ color: 'var(--primary)' }}>Verified Listings</h3>
            <p>Every PG is physically verified by our team to ensure safety and quality standards.</p>
          </div>

          <div className="pg-card" style={{ textAlign: 'center', cursor: 'default' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>💸</h3>
            <h3 style={{ color: 'var(--primary)' }}>Zero Brokerage</h3>
            <p>Connect directly with owners and save money by eliminating middlemen.</p>
          </div>

          <div className="pg-card" style={{ textAlign: 'center', cursor: 'default' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🍔</h3>
            <h3 style={{ color: 'var(--primary)' }}>Great Amenities</h3>
            <p>Filter by food availability, AC/Non-AC, Wi-Fi, and laundry services.</p>
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ padding: '4rem 2rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ marginBottom: '3rem' }}>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.5rem', fontWeight: 'bold' }}>1</div>
            <h3>Search</h3>
            <p>Find PGs in your preferred city.</p>
          </div>
          <div>
            <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.5rem', fontWeight: 'bold' }}>2</div>
            <h3>Visit</h3>
            <p>Check the photos and amenities.</p>
          </div>
          <div>
            <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
            <h3>Book</h3>
            <p>Book directly without hassle.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;