'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

// Define the type for the props
interface DocumentationCardProps {
  id: string;
  docId: string;
  title: string;
  description: string;
}

export default function DocumentationCard({ id, docId, title, description }: DocumentationCardProps) {
  const params = useParams<{ id: string }>();
  console.log(params);

  return (
    <>
      <article className="rounded-lg border border-gray-100 bg-customColor shadow-sm p-4 transition hover:shadow-lg sm:p-6">
        <span className="inline-block rounded bg-iconBackground p-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </span>

        <h3 className="mt-0.5 text-lg font-medium text-black">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-600">
          {description}
        </p>

        <Link
          href={`/dashboard/${id}/documentation/${docId}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-buttonBackground hover:text-orange-600 hover:text-[15px]"
        >
          Go to Documentation

          <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
            &rarr;
          </span>
        </Link>
      </article>
    </>
  );
}