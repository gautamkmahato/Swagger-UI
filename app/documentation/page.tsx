'use client';

import { useEffect, useState } from 'react';
import Test from '../_components/Test';
import fetchJsonData from '../actions/fetchJsonData';

// Define the type for the JSON data response
interface JsonDataResponse {
  openapi_schema: string;
  [key: string]: any;
}

export default function Documentation({ params }: { params: { docId: string } }) {
  const { docId } = params;
  const [checkDocIdStatus, setCheckDocIdStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [apiData, setApiData] = useState<string>('');

  useEffect(() => {
    async function getJsonData() {
      setLoading(true);
      try {
        const jsonData = (await fetchJsonData(docId)) as JsonDataResponse[];
        if (jsonData[0]?.openapi_schema) {
          setCheckDocIdStatus(true);
          setApiData(jsonData[0].openapi_schema);
        } else {
          setErrorMessage('Please upload the JSON data.');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch JSON data.');
      } finally {
        setLoading(false);
      }
    }
    getJsonData();
  }, [docId]);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      {errorMessage && <h1>{errorMessage}</h1>}
      {checkDocIdStatus ? (
        <Test apiData={apiData} docId={docId} />
      ) : (
        <>
          <h1>No Data available</h1>
        </>
      )}
    </>
  );
}