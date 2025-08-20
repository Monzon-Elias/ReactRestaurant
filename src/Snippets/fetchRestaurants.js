// src/Snippets/fetchRestaurants.js
import { buildListURL } from '../utils/constants.js';

export async function fetchRestaurants(lat, lng, collection) {
    const url = buildListURL(lat, lng, collection);
    const res = await fetch(url, { credentials: 'include' }); // cookies ON
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res.json();
}
