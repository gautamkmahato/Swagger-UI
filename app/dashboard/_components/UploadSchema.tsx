'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Test from '../../_components/Test';
import uploadJsonData from '@/app/actions/uploadJsonData';

interface UploadSchemaProps {
  docId: string;
}

interface ApiResponse {
  ans: any; // Replace `any` with the actual type of the response if known
}

export default function UploadSchema({ docId }: UploadSchemaProps) {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [fileContent, setFileContent] = useState<any | null>(null);
  const [apiData, setApiData] = useState<any | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text'>('file');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file && uploadMethod === 'file') {
      setError('Please select a file');
      return;
    }
    
    try {
      const text = uploadMethod === 'file' && file ? await file.text() : inputText;
      const data = JSON.parse(text);

      const response = await fetch('http://localhost:5000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.details);
        throw new Error(errorData.details || 'Error processing request');
      }

      const { ans }: ApiResponse = await response.json();
      setFileContent(ans);
      console.log(ans);
    } catch (error) {
      console.error('Error processing input:', error);
      setFileContent(null);
    }
  };

  const handleInputData = async () => {
    setLoading(true);

    const result = await uploadJsonData(fileContent, docId);

    if (result) {
      fileContent ? setApiData(fileContent) : alert('Please upload or paste JSON first');
      setLoading(false);
    } else {
      console.log('Something went wrong in uploading apiData to Database');
      setLoading(false);
    }
  };

  return (
    <>
      {error && <h1>{error}</h1>}
      <div className="min-h-screen bg-gray-50 p-6 md:p-20 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setUploadMethod('file')}
              className={`mr-4 px-4 py-2 rounded ${uploadMethod === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              File Upload
            </button>
            <button
              onClick={() => setUploadMethod('text')}
              className={`px-4 py-2 rounded ${uploadMethod === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Paste JSON
            </button>
          </div>

          {uploadMethod === 'file' ? (
            <form onSubmit={handleFileUpload} className="mb-6">
              <input
                type="file"
                accept=".json"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                disabled={!file}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Upload JSON File
              </button>
            </form>
          ) : (
            <div className="mb-6">
              <textarea
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
                placeholder="Paste your JSON here"
                rows={6}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleFileUpload}
                disabled={!inputText}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Process JSON
              </button>
            </div>
          )}

          <button
            onClick={handleInputData}
            disabled={!fileContent}
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 disabled:opacity-50 mt-4"
          >
            Convert to Documentation
          </button>
        </div>

        {apiData && (
          <div className="mt-8 w-full max-w-4xl">
            <Test apiData={apiData} docId={docId} />
          </div>
        )}
      </div>
    </>
  );
}
