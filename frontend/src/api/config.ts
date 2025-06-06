const getBaseUrl = () => {
    // Log available environment variables for debugging
    console.log("Environment variables:", {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        CODESPACE_NAME: process.env.CODESPACE_NAME
    });
    
    if (import.meta.env.VITE_API_URL) {
        console.log("Using VITE_API_URL:", import.meta.env.VITE_API_URL);
        return import.meta.env.VITE_API_URL;
    }
    
    // Check if we're in a Codespace
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        const url = `https://${codespaceName}-3000.app.github.dev`;
        console.log("Using Codespace URL:", url);
        return url;
    }
    
    // Local development fallback
    console.log("Using localhost fallback URL");
    return 'http://localhost:3000';
};

export const API_BASE_URL = getBaseUrl();

// Export this object for debugging
export const apiEndpoints = {
    products: '/api/products',
    suppliers: '/api/suppliers',
    orders: '/api/orders',
    branches: '/api/branches',
    headquarters: '/api/headquarters',
    deliveries: '/api/deliveries',
    orderDetails: '/api/order-details',
    orderDetailDeliveries: '/api/order-detail-deliveries'
};

export const api = {
    baseURL: API_BASE_URL,
    endpoints: apiEndpoints
};