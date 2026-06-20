import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axiosConfig";
import PgCard from "../components/PgCard";
import { showToast } from "../utils/toast";

const PgListPage = () => {
  const [pgs, setPgs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get("/pgs")
      .then((res) => setPgs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addFavorite = (pgId) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      showToast("Please login first to add favorites!", "error");
      return;
    }
    const user = JSON.parse(userStr);
    
    api.post("/favorites/add", { userId: user.id, pgId })
      .then(() => showToast("Added to favorites!", "success"))
      .catch(() => showToast("Error adding to favorites", "error"));
  };

  // Read search query from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("q") || "";

  const filteredPGs = pgs.filter((pg) =>
    (pg.pgName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pg.city || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="pg-grid">
        {filteredPGs.map((pg) => (
          <PgCard key={pg.id} pg={pg} onFavorite={addFavorite} />
        ))}
        {filteredPGs.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No PGs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default PgListPage;