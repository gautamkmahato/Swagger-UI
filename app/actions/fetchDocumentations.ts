'use server'

export default async function fetchDocumentations(){
    const response = await fetch('http://localhost:5000/api/v1/documentations');
    const result = await response.json();

    if(!response.ok){
        return {
            message: "Error in fetching Request in getAllDocumentations"
        }
    }
    return result;
}