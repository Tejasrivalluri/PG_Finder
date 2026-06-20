import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [pgDetails, setPgDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);

    api.get(`/bookings/user/${user.id}`)
      .then(async (res) => {
        const userBookings = res.data;
        setBookings(userBookings);

        // Fetch PG details for each booking to display PG name and location
        const pgData = {};
        for (const booking of userBookings) {
          try {
            const pgRes = await api.get(`/pgs/${booking.pgId}`);
            pgData[booking.pgId] = pgRes.data;
          } catch (err) {
            console.error("Error fetching PG details for booking:", err);
          }
        }
        setPgDetails(pgData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <h2 className="text-center" style={{marginTop: '4rem'}}>Loading your bookings...</h2>;

  return (
    <div>
      <h2 className="text-center" style={{ marginBottom: '2rem' }}>📅 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="auth-card" style={{ maxWidth: '600px', margin: '4rem auto' }}>
          <h3>No Bookings Found</h3>
          <p className="mb-4">You haven't booked any PG accommodations yet.</p>
          <button onClick={() => navigate('/pgs')} style={{ width: '100%' }}>Browse PGs</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {bookings.map((booking) => {
            const pg = pgDetails[booking.pgId];
            return (
              <div key={booking.id} className="pg-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'default' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{pg ? pg.pgName : "Loading PG..."}</h3>
                  <p style={{ margin: 0 }}>📍 {pg ? pg.city : "Unknown Location"}</p>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>
                    Move-in Date: {new Date(booking.moveInDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '50px', 
                    background: booking.status === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: booking.status === 'CONFIRMED' ? '#34d399' : '#fbbf24',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {booking.status || "PENDING"}
                  </span>
                  <p className="rent" style={{ margin: 0 }}>Rent: ₹{pg ? pg.rent : "..."}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
