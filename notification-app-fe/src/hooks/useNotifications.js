import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(filter, page) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchNotifications({
          limit: 10,
          page,
          notification_type: filter,
        });

        setNotifications(data.notifications ?? []);
        setTotal(data.total ?? 0);
        setTotalPages(Math.max(Math.ceil((data.total || 0) / 10), 1));
      } catch (err) {
        setError(err.message);
        setNotifications([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [filter, page]);

  return { notifications, total, totalPages, loading, error };
}
