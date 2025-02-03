'use server'

export default async function convertToOpenApiSchema(inputData: unknown){
    const response = await fetch('https://written-karly-gkmnanu-a85fa9c6.koyeb.app/convert/openapi', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 
    console.log(result)

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewDocumentation"
        }
    }
    return result;
}