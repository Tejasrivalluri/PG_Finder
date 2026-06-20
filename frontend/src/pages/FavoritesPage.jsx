import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import PgCard from "../components/PgCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);

    // Fetch favorites for this specific user
    api.get(`/favorites/${user.id}`)
      .then((res) => {
        setFavorites(res.data);
        return res.data;
      })
      .then(async (favData) => {
        // We only have PG IDs, we need to fetch the actual PG details for each favorite
        const pgPromises = favData.map(fav => api.get(`/pgs/${fav.pgId}`));
        const pgResponses = await Promise.all(pgPromises);
        setPgs(pgResponses.map(r => r.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center" style={{marginTop: '4rem'}}>Loading Favorites...</h2>;

  return (
    <div>
      <h2 className="text-center" style={{ marginBottom: '2rem' }}>❤️ Your Favorite PGs</h2>

      {pgs.length === 0 ? (
        <p className="text-center text-muted">You haven't added any favorites yet.</p>
      ) : (
        <div className="pg-grid">
          {pgs.map((pg) => (
            <PgCard key={pg.id} pg={pg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;