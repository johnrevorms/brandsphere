import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor to attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple in-memory cache to achieve sub-second SPA navigation
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const originalGet = api.get;

api.get = async (url, config = {}) => {
  // Exclude user-specific or highly dynamic endpoints from caching
  const shouldCache = !url.includes('/orders') && 
                      !url.includes('/user') && 
                      !url.includes('/shipping') &&
                      !url.includes('/applications');

  if (shouldCache) {
    const cached = cache.get(url);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      // Return cached promise/response instantly
      return Promise.resolve(cached.data);
    }
  }

  // Fetch from server
  const response = await originalGet.call(api, url, config);
  
  if (shouldCache) {
    cache.set(url, { data: response, timestamp: Date.now() });
  }
  
  return response;
};

export default api;
