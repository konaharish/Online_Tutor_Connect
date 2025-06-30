
// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

// Mock function to get coordinates from address
export const getCoordinatesFromAddress = async (address: string): Promise<{lat: number, lng: number} | null> => {
  // In a real app, this would use Google Maps Geocoding API or similar
  // For demo purposes, returning mock coordinates based on city names
  const cityCoordinates: { [key: string]: {lat: number, lng: number} } = {
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'delhi': { lat: 28.7041, lng: 77.1025 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'pune': { lat: 18.5204, lng: 73.8567 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 }
  };
  
  const city = address.toLowerCase();
  for (const [key, coords] of Object.entries(cityCoordinates)) {
    if (city.includes(key)) {
      return coords;
    }
  }
  
  return null;
};
