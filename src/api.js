

export async function asyncFetch(startDate, endDate){

        const apiKey = 'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2';

        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    
        
        const response = await fetch (url);
        const respData = await response.json();
        return respData.near_earth_objects;
        
}


export async function fetchCloseToEarth(id){

        const apiKey = 'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2';
        const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
        const response = await fetch(url);
        const responseData = await response.json();
        return responseData.close_approach_data;
}