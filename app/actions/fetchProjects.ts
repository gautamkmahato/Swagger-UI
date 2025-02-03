

'use server'

export default async function fetchProjects(userId: unknown){
    const response = await fetch('https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/projects', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userId)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in fetching Request in getAllProjects"
        }
    }
    return result;
}