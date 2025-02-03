'use server'

export default async function fetchJsonData(docId: string){
    const response = await fetch(`https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/documentation/${docId}/schema`);
    const result = await response.json();

    if(!response.ok){
        return {
            message: "Error in fetching Request in fetchJsonData"
        }
    }
    return result;
}