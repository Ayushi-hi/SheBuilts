import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function XPWidget() {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    api.getXP(token)
      .then(setData)
      .catch(console.error);
  }, [token]);

  if (!data) return null;

  const percent = (data.xp / data.next_level_xp) * 100;

  return (
    <div className="xp-widget">
      <div className="xp-top">
        <span>Level {data.level} 🚀</span>
        <span>{data.title}</span>
      </div>

      <div className="xp-bar">
        <div
          className="xp-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <small>
        {data.xp} / {data.next_level_xp} XP
      </small>
    </div>
  );
}