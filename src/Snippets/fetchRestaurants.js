// src/Snippets/fetchRestaurants.js
import { buildListURL, buildListURLAlt } from '../utils/constants.js';

export async function fetchRestaurants(lat, lng, collection) {
    try {
        // Try the primary CORS proxy first
        const url = buildListURL(lat, lng, collection);
        const res = await fetch(url, {
            credentials: 'omit' // Explicitly exclude credentials
        });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.log('Primary CORS proxy failed, trying alternative...');
        // Fallback to alternative CORS proxy
        const altUrl = buildListURLAlt(lat, lng, collection);
        const res = await fetch(altUrl, {
            credentials: 'omit'
        });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
    }
}
