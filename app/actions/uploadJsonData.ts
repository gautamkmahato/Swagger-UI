'use server'

export default async function uploadJsonData(apiData: unknown, docId){
    console.log(apiData)
    const response = await fetch(`https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/documentations/${docId}/add/schema`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(apiData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewProject"
        }
    }
    return result;
}