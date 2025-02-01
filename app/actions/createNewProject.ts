'use server'

export default async function createNewProject(inputData: unknown){
    const response = await fetch('http:localhost:5000/api/v1/projects/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewProject"
        }
    }
    return result;
}