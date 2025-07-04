import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.spacexdata.com/v4/launches/query';

function getDateRangeFilter(dateRange) {
  const now = new Date();
  let startDate;
  if (dateRange === '6m') {
    startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 6);
  } else if (dateRange === '12m') {
    startDate = new Date(now);
    startDate.setFullYear(now.getFullYear() - 1);
  } else {
    return {};
  }
  return {
    date_utc: { $gte: startDate.toISOString(), $lte: now.toISOString() },
  };
}

export default function useLaunches({ page, limit, dateRange, launchType }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    const filters = { ...getDateRangeFilter(dateRange) };
    if (launchType === 'upcoming') filters.upcoming = true;
    if (launchType === 'success') filters.success = true;
    if (launchType === 'failed') filters.success = false;
    axios.post(API_URL, {
      query: filters,
      options: {
        page,
        limit,
        sort: { date_utc: -1 },
        populate: ['rocket', 'launchpad', 'payloads'],
      },
    })
      .then(res => {
        if (!isMounted) return;
        setLaunches(res.data.docs);
        setPageCount(res.data.totalPages);
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [page, limit, dateRange, launchType]);

  return { launches, loading, error, pageCount };
} 