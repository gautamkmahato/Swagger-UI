'use server';

export default async function uploadJsonData(apiData: unknown, docId: string): Promise<any> {

    console.log(apiData);

    try {
        const response = await fetch(
        `https://written-karly-gkmnanu-a85fa9c6.koyeb.app/api/v1/documentations/${docId}/add/schema`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData),
        }
        );

        const result = await response.json();

        if (!response.ok) {
        return {
            message: 'Error in Inserting Data in uploadJsonData',
        };
        }

        return result;
    } catch (error) {
        return {
        message: `Fetch error: ${(error as Error).message}`,
        };
    }
}
