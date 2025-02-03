interface ProjectCardProps {
  title: string;
  description: string;
  created_at: string;
}

export default function ProjectCard({ title, description, created_at }: ProjectCardProps) {
  return (
    <>
      {/*
        Heads up! 👋

        This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
      */}

      <article
        className="rounded-lg border border-gray-100 bg-customColor p-4 shadow-sm transition hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25"
      >
        <span className="inline-block rounded bg-iconBackground p-2 text-white dark:bg-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </span>

        <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <p className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600">
          {created_at.split('T')[0]}
        </p>
      </article>
    </>
  );
}
