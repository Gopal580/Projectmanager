// usePaginatedProjects.js

import { useEffect, useState } from "react";
import useAxios from "../utils/axiosInstance";
export function usePaginatedProjects({ page = 1, pageSize = 10, status, refreshTrigger = 0 }) {
  const [data, setData] = useState({
    projects: [],
    total: 0,
    loading: true,
  });
const axiosInstance=useAxios()
  useEffect(() => {
    setData((d) => ({ ...d, loading: true }));
    axiosInstance
      .get("/projects/getAllProjects", {
        params: { page, pageSize, status },
      withCredentials:true})
      .then((res) =>
        setData({
          projects: res.data.projects,
          total: res.data.total,
          loading: false,
        })
      )
      .catch(() =>
        setData({
          projects: [],
          total: 0,
          loading: false,
        })
      );
  }, [page, pageSize, status, refreshTrigger]); // include refreshTrigger

  return data; // returns { projects, total, loading }
}
