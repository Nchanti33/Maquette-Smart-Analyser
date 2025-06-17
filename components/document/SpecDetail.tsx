"use client";

import React from "react";

interface SpecDetailProps {
  jsonData: any;
  specId: string;
}

export const SpecDetail: React.FC<SpecDetailProps> = ({ jsonData, specId }) => {
  if (!jsonData || typeof jsonData !== "object") {
    return (
      <div className="bg-white rounded-lg shadow border border-teal-200 p-4 overflow-auto">
        <div className="text-red-600 font-bold mb-2">Erreur de données</div>
        <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
          {String(jsonData)}
        </pre>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-teal-200 p-4 overflow-auto">
      {/* En-tête amélioré avec badge d'identifiant */}
      <div className="border-b border-teal-200 pb-4 mb-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-800 text-white font-bold rounded-lg px-5 py-2 mb-3 shadow-md transform transition-transform hover:scale-[1.02]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>{specId}</span>
        </div>
        {jsonData.title && (
          <h1 className="text-xl font-bold text-teal-800 mt-2 relative inline-block">
            {jsonData.title}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-300 to-transparent opacity-60"></div>
          </h1>
        )}
        {jsonData.description && (
          <p className="text-sm text-teal-600 mt-3 italic max-w-prose leading-relaxed bg-teal-50 p-3 rounded-lg">
            {jsonData.description}
          </p>
        )}
      </div>

      {/* Card layout with improved style */}
      <div className="grid grid-cols-1 gap-4">
        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Type & Category */}
          {(jsonData.type || jsonData.category) && (
            <div className="detail-card bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 shadow-sm border border-teal-200 fade-in">
              <div className="card-accent card-accent-teal"></div>
              <div className="flex items-center mb-2">
                <div className="bg-teal-200 p-2 rounded-md mr-3 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-teal-800 text-sm">
                  Classification
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-2">
                {jsonData.type && (
                  <span className="badge-fancy bg-teal-200 text-teal-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Type: {jsonData.type}
                  </span>
                )}
                {jsonData.category && (
                  <span className="badge-fancy bg-teal-200 text-teal-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Catégorie: {jsonData.category}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Card 2: Status & Priority */}
          {(jsonData.status || jsonData.priority) && (
            <div className="detail-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm border border-blue-200 fade-in">
              <div className="card-accent card-accent-blue"></div>
              <div className="flex items-center mb-2">
                <div className="bg-blue-200 p-2 rounded-md mr-3 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-blue-800 text-sm">Statut</h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-2">
                {jsonData.status && (
                  <span className="badge-fancy bg-blue-200 text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    État: {jsonData.status}
                  </span>
                )}
                {jsonData.priority && (
                  <span className="badge-fancy bg-purple-200 text-purple-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                    </svg>
                    Priorité: {jsonData.priority}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Card */}
        {jsonData.content && (
          <div className="detail-card bg-white rounded-lg p-5 shadow-sm border border-teal-200 fade-in">
            <div className="card-accent card-accent-teal"></div>
            <div className="flex items-center mb-3">
              <div className="bg-teal-100 p-2 rounded-md mr-3 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-teal-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-teal-800">Description détaillée</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-sm whitespace-pre-wrap break-words border-l-4 border-teal-500 shadow-inner leading-relaxed">
              {jsonData.content}
            </div>
          </div>
        )}

        {/* Requirements Card */}
        {jsonData.requirements && jsonData.requirements.length > 0 && (
          <div className="detail-card bg-white rounded-lg p-5 shadow-sm border border-amber-200 fade-in">
            <div className="card-accent card-accent-amber"></div>
            <div className="flex items-center mb-3">
              <div className="bg-amber-100 p-2 rounded-md mr-3 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-amber-800">
                Exigences ({jsonData.requirements.length})
              </h3>
            </div>
            <ul className="bg-amber-50 rounded-lg p-4 space-y-3 text-sm shadow-inner border border-amber-100">
              {jsonData.requirements.map((req: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start hover:bg-amber-100/50 p-2 rounded-md transition-all"
                >
                  <span className="inline-flex items-center justify-center bg-amber-200 text-amber-800 rounded-full h-5 w-5 min-w-5 text-xs font-bold mr-2 mt-0.5 shadow-sm">
                    {idx + 1}
                  </span>
                  <span className="text-amber-900 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Variables Card */}
        {jsonData.variables &&
          Array.isArray(jsonData.variables) &&
          jsonData.variables.length > 0 && (
            <div className="detail-card bg-white rounded-lg p-5 shadow-sm border border-green-200 fade-in">
              <div className="card-accent card-accent-green"></div>
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-md mr-3 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-green-800">
                  Variables ({jsonData.variables.length})
                </h3>
              </div>
              <ul className="bg-green-50 rounded-lg p-4 space-y-3 text-sm shadow-inner border border-green-100">
                {jsonData.variables.map((variable: any, idx: number) => (
                  <li
                    key={idx}
                    className="flex flex-col gap-1 p-2 rounded-md hover:bg-green-100/50 transition-all"
                  >
                    <span className="font-semibold text-green-900">
                      {variable.name || `Variable ${idx + 1}`}
                    </span>
                    {variable.value !== undefined && (
                      <span className="text-green-800 text-xs bg-green-50 rounded px-2 py-1">
                        {String(variable.value)}
                      </span>
                    )}
                    {variable.description && (
                      <span className="text-xs text-green-700 italic">
                        {variable.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Additional Properties Card */}
        {Object.entries(jsonData).some(
          ([key, value]) =>
            ![
              "id",
              "title",
              "description",
              "type",
              "category",
              "status",
              "priority",
              "content",
              "requirements",
            ].includes(key) && typeof value !== "object"
        ) && (
          <div className="detail-card bg-white rounded-lg p-5 shadow-sm border border-indigo-200 fade-in">
            <div className="card-accent card-accent-indigo"></div>
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 p-2 rounded-md mr-3 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-indigo-700">
                Informations complémentaires
              </h3>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {Object.entries(jsonData).map(([key, value]) => {
                  // Skip properties we've already displayed or that are objects/arrays
                  if (
                    [
                      "id",
                      "title",
                      "description",
                      "type",
                      "category",
                      "status",
                      "priority",
                      "content",
                      "requirements",
                    ].includes(key) ||
                    typeof value === "object"
                  ) {
                    return null;
                  }
                  return (
                    <div
                      key={key}
                      className="flex flex-col bg-white p-3 rounded border border-indigo-100 transition-all hover:shadow-sm transform hover:-translate-y-0.5"
                    >
                      <span className="text-indigo-600 text-xs font-medium uppercase tracking-wider flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {key}
                      </span>
                      <span className="font-medium break-words text-gray-800 mt-1 bg-gray-50 p-2 rounded">
                        {String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
