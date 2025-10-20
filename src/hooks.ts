export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
    const apiKey = '07a042d32adf46ef975e8ade1500ec90'; // при необходимости вынести в файл .env
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        return data.results[0].formatted;
    }
    return null;
}
