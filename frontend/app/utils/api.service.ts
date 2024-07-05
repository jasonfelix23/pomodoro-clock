
const API_BASE_URL = 'http://localhost:8080';

async function getFromAPI(endpoint: string): Promise<any> {
    const url = `${API_BASE_URL}/${endpoint}`;
    try{
        const credentials = btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`);
        const response = await fetch(url, {
            headers: {
                'Authorization' :  `Basic ${credentials}`
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }
        console.log(response);
        return await response.text();
    }catch(e){
        console.error(`Error fetching ${endpoint}: `, e);
        throw e;
    }
}

export async function ping(): Promise<any>{
    return getFromAPI(`ping`);
}