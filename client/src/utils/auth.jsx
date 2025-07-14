// Helper functions for authentication
export const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    
    if (!token || !expiry) return false;
    
    // Check if token is expired
    if (Date.now() > parseInt(expiry)) {
        logout();
        return false;
    }
    
    return true;
};

export const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    window.location.href = '/admin/login'; // Full reload to clear state
};

export const getAuthToken = () => {
    return localStorage.getItem('adminToken');
};