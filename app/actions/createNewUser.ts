'use server'

export default async function createNewUser(inputData: unknown){
    const response = await fetch('https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/user', {
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