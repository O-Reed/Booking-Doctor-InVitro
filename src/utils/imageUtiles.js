// Cache to store already generated avatar URLs
const avatarCache = new Map();

/**
 * Generates an avatar URL from a person's name using their initials
 * 
 * @param {string} name - The person's full name
 * @param {Object} options - Configuration options for the avatar
 * @param {string} options.background - Background color (hex without #, or 'random')
 * @param {string} options.color - Text color (hex without #)
 * @param {number} options.size - Image size in pixels
 * @param {boolean} options.useCache - Whether to use cached results
 * @returns {string} - URL to the generated avatar image
 */
export const getInitialsAvatar = (name, options = {}) => {
  // Handle empty or invalid input
  if (!name || typeof name !== 'string') {
    console.warn('getInitialsAvatar received invalid name:', name);
    return 'https://ui-avatars.com/api/?name=?&background=868e96&color=fff';
  }
  
  // Set default options
  const {
    background = 'random',
    color = 'fff',
    size = 256,
    useCache = true
  } = options;
  
  // Generate cache key
  const cacheKey = `${name}-${background}-${color}-${size}`;
  
  // Return cached value if available
  if (useCache && avatarCache.has(cacheKey)) {
    return avatarCache.get(cacheKey);
  }
  
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(part => part[0] || '') // Handle empty parts safely
    .join('')
    .toUpperCase();
  
  // Create the avatar URL
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=${size}`;
  
  // Store in cache for future use
  if (useCache) {
    avatarCache.set(cacheKey, avatarUrl);
  }
  
  return avatarUrl;
};

/**
 * Preloads an avatar image to improve perceived performance
 * 
 * @param {string} avatarUrl - URL of the avatar to preload
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const preloadAvatar = (avatarUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(avatarUrl);
    img.onerror = () => reject(new Error(`Failed to preload avatar: ${avatarUrl}`));
    img.src = avatarUrl;
  });
};

/**
 * Generates a color hash from a string (for consistent color assignment)
 * 
 * @param {string} str - Input string to hash
 * @returns {string} - Hex color code (without #)
 */
export const stringToColor = (str) => {
  if (!str || typeof str !== 'string') return '868e96'; // Default gray
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
};