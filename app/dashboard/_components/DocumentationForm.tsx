'use client'

import createNewDocumentation from "@/app/actions/createNewDocumentation";
import { useState } from "react";

// Define props type for DocumentationForm component
interface DocumentationFormProps {
  onFormSubmit: () => void;
  project_id: string;
}

export default function DocumentationForm({ onFormSubmit, project_id }: DocumentationFormProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputData = {
        title: title,
        description: description,
        project_id: project_id,
    };

    try {
      const result = await createNewDocumentation(inputData);
      if (result) {
        onFormSubmit(); // Close the modal and refresh the projects list
      } else {
        console.error('Error creating documentation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-2xl">
          Create New Project
        </h1>
        <form onSubmit={handleFormSubmit} className="mb-0 space-y-4 rounded-lg sm:p-6 lg:px-0 lg:py-4">
          <div>
            <label htmlFor="text" className="sr-only">
              Project Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Project Name"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Description"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
