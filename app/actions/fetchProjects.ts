'use server'

export default async function fetchProjects(){
    const response = await fetch('http://localhost:5000/api/v1/projects');
    const result = await response.json();

    if(!response.ok){
        return {
            message: "Error in fetching Request in getAllProjects"
        }
    }
    return result;
}