// src/utils/constants.js
export const LAT = 12.9352403;
export const LNG = 77.624532;
export const COLLECTION = '83639';

// Endpoints a través del proxy local (vite.config.js)
export const LIST_URL   = '/api/swiggy/list';

export const buildListURL = (lat = LAT, lng = LNG, collection = COLLECTION) =>
    `${LIST_URL}?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING&collection=${collection}`;

export const CDN_URL =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

export const MENU_URL = 'https://corsproxy.io/?url=https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=';
