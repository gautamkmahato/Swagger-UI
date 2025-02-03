'use server'

export default async function fetchDocumentationByProjectId(projectId){
    console.log("projectId", projectId)
    const response = await fetch(`https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/documentations/${projectId}`);
    const result = await response.json();

    console.log(result)

    if(!response.ok){
        return {
            message: "Error in fetching Request in fetchDocumentationByProjectId"
        }
    }
    return result;
}