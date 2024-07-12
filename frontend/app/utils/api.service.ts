import { User } from "../home/page";

export type ApiResponse<T> = {
    status: number;
    data: T;
  };
  

const API_BASE_URL = 'http://localhost:8080';

export async function postToAPI<T, R>(endpoint: string, data: T): Promise<ApiResponse<R>> {
    const url = `${API_BASE_URL}/${endpoint}`;
    try {
        const credentials = btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(data) // Convert data to JSON string
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const responseData: R = await response.json(); // Parse JSON directly

        return { status: response.status, data: responseData };
    } catch (e) {
        console.error(`Error fetching ${endpoint}: `, e);
        throw e;
    }
}

async function putToAPI<T>(endpoint:string, data: T): Promise<ApiResponse<Boolean>>{
    const url = `${API_BASE_URL}/${endpoint}`;
    try{
        const credentials = btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(data) // Convert data to JSON string
        });
        if(!response.ok){
            throw new Error('Failed to update data');
        }

        return {status: response.status, data: response.ok? true: false};
    }catch(e){
        console.error(`Error fetch ${endpoint}: `, e);
        throw e;
    }
}


async function getFromAPI<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}/${endpoint}`;
    try{
        const credentials = btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`);
        const response = await fetch(url, {
            headers: {
                'Authorization' :  `Basic ${credentials}`,
                'content-type' : 'application'
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }
        
        const contentType = response.headers.get('content-type');
        let data: T;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text() as unknown as T;
        }

        return { status: response.status, data: data };
    }catch(e){
        console.error(`Error fetching ${endpoint}: `, e);
        throw e;
    }
}

export async function ping(): Promise<ApiResponse<String>>{
    return getFromAPI<String>(`ping`);
}

export async function checkIfUserExists(userEmail: String): Promise<ApiResponse<Number>>{
    return getFromAPI<Number>(`v1/users/exists?email=${userEmail}`);
}

export async function getUserData(id: Number): Promise<ApiResponse<User>>{
    return getFromAPI<User>(`v1/users/`+ id);
}

export async function createUser(email: string, name: string): Promise<ApiResponse<User>>{
    const userData: User = {firstName: name, emailAddress: email, pomoSessionDuration: 25, pomoSessionBreak: 5};
    return postToAPI<User, User>('v1/users', userData);
}

export async function updateUserSettings(user: User): Promise<ApiResponse<Boolean>>{
    return putToAPI<User>('v1/users', user);
} 