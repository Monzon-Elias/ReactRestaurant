// src/Snippets/fetchRestaurants.js
import { buildListURL, buildListURLAlt } from '../utils/constants.js';

export async function fetchRestaurants(lat, lng, collection) {
    try {
        // Try the primary CORS proxy first
        const url = buildListURL(lat, lng, collection);
        console.log('Trying primary CORS proxy:', url);
        
        const res = await fetch(url, {
            credentials: 'omit' // Explicitly exclude credentials
        });
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('Primary proxy response status:', res.status);
        console.log('Primary proxy response headers:', Object.fromEntries(res.headers.entries()));
        
        return data;
    } catch (error) {
        console.log('Primary CORS proxy failed:', error.message);
        console.log('Trying alternative CORS proxy...');
        
        // Fallback to alternative CORS proxy
        try {
            const altUrl = buildListURLAlt(lat, lng, collection);
            console.log('Trying alternative CORS proxy:', altUrl);
            
            const res = await fetch(altUrl, {
                credentials: 'omit'
            });
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} ${res.statusText}`);
            }
            
            const data = await res.json();
            console.log('Alternative proxy response status:', res.status);
            console.log('Alternative proxy response headers:', Object.fromEntries(res.headers.entries()));
            
            return data;
        } catch (altError) {
            console.error('Both CORS proxies failed:', {
                primary: error.message,
                alternative: altError.message
            });
            throw new Error(`All CORS proxies failed. Primary: ${error.message}, Alternative: ${altError.message}`);
        }
    }
}
