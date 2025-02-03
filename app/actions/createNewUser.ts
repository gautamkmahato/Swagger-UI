'use server'

export default async function createNewUser(inputData: unknown){
    const response = await fetch('http://localhost:5000/api/v1/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewUser"
        }
    }
    return result;
}