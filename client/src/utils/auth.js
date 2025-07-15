export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  const expiry = localStorage.getItem('adminTokenExpiry');
  
  if (!token || !expiry) return false;
  
  // Check if token is expired
  if (Date.now() > parseInt(expiry, 10)) {
    clearAuthData();
    return false;
  }
  
  return true;
};

export const clearAuthData = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminTokenExpiry');
};

export const checkAuth = () => {
  if (!isAuthenticated()) {
    clearAuthData();
    return false;
  }
  return true;
};