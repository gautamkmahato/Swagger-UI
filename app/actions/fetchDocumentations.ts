'use server'

export default async function fetchDocumentations(){
    const response = await fetch('https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/documentations');
    const result = await response.json();

    if(!response.ok){
        return {
            message: "Error in fetching Request in getAllDocumentations"
        }
    }
    return result;
}