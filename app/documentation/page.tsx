'use client';

import { useEffect, useState } from 'react';
import Test from '../_components/Test';
import fetchJsonData from '../actions/fetchJsonData';

// Interface for JsonData response structure
interface JsonData {
  openapi_schema?: Record<string, any>; // JSON object
}

export default function Documentation() {
  // Extract docId from the URL params (Assuming docId is part of the URL)
  const docId = window.location.pathname.split('/').pop() as string;

  const [checkDocIdStatus, setCheckDocIdStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    async function getJsonData() {
      setLoading(true);
      const jsonData: JsonData[] = await fetchJsonData(docId);

      if (jsonData[0]?.openapi_schema) {
        setCheckDocIdStatus(true);
        setApiData(jsonData[0].openapi_schema);
      } else {
        setErrorMessage('Please upload the JSON data:');
      }
      setLoading(false);
    }

    getJsonData();
  }, [docId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {errorMessage && <h1>{errorMessage}</h1>}
      {checkDocIdStatus ? (
        <Test apiData={apiData} docId={docId} />
      ) : (
        <h1>No Data available</h1>
      )}
    </>
  );
}
