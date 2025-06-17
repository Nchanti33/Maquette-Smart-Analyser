// Voici la section correcte du fichier page.tsx pour la partie centrale

<ResizablePanel defaultSize={40}>
  <div className="h-full p-1 overflow-auto content-container">
    {selectedCaseIdx !== null && outputDataArray[selectedCaseIdx] ? (
      <div className="bg-white rounded-lg shadow border border-teal-200 p-4 overflow-auto">
        {(() => {
          try {
            const jsonData = JSON.parse(
              outputDataArray[selectedCaseIdx].replace(/\n/g, "")
            );
            const specId = jsonData.id || `Spec ${selectedCaseIdx + 1}`;

            return (
              <>
                {/* En-tête amélioré avec badge d'identifiant */}
                <div className="border-b border-teal-200 pb-4 mb-4 flex flex-col items-center text-center">
                  <div className="inline-block bg-teal-700 text-white font-bold rounded-lg px-4 py-1 mb-2 shadow-sm">
                    {specId}
                  </div>
                  {jsonData.title && (
                    <h1 className="text-xl font-bold text-teal-800 mt-2">
                      {jsonData.title}
                    </h1>
                  )}
                  {jsonData.description && (
                    <p className="text-sm text-teal-500 mt-2 italic max-w-prose">
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
                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 shadow-sm border border-teal-200 transition-all hover:shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-teal-200 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-800" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-teal-800 text-sm">Classification</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-2">
                          {jsonData.type && (
                            <span className="inline-block bg-teal-200 text-teal-800 rounded-full px-3 py-1 text-xs font-medium">
                              Type: {jsonData.type}
                            </span>
                          )}
                          {jsonData.category && (
                            <span className="inline-block bg-teal-200 text-teal-800 rounded-full px-3 py-1 text-xs font-medium">
                              Catégorie: {jsonData.category}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Card 2: Status & Priority */}
                    {(jsonData.status || jsonData.priority) && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm border border-blue-200 transition-all hover:shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-200 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-blue-800 text-sm">Statut</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-2">
                          {jsonData.status && (
                            <span className="inline-block bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-xs font-medium">
                              État: {jsonData.status}
                            </span>
                          )}
                          {jsonData.priority && (
                            <span className="inline-block bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-xs font-medium">
                              Priorité: {jsonData.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Main Content Card */}
                  {jsonData.content && (
                    <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-200 transition-all hover:shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-teal-100 p-2 rounded-md mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-800" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-teal-800">Description détaillée</h3>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm whitespace-pre-wrap break-words border-l-4 border-teal-500">
                        {jsonData.content}
                      </div>
                    </div>
                  )}

                  {/* Requirements Card */}
                  {jsonData.requirements && jsonData.requirements.length > 0 && (
                    <div className="bg-white rounded-lg p-5 shadow-sm border border-amber-200 transition-all hover:shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-amber-100 p-2 rounded-md mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-amber-800">Exigences ({jsonData.requirements.length})</h3>
                      </div>
                      <ul className="bg-amber-50 rounded-lg p-4 space-y-2 text-sm">
                        {jsonData.requirements.map((req: any, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="inline-flex items-center justify-center bg-amber-200 text-amber-800 rounded-full h-5 w-5 min-w-5 text-xs font-bold mr-2 mt-0.5">{idx + 1}</span>
                            <span className="text-amber-900">{req}</span>
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
                      ].includes(key) && 
                      typeof value !== "object"
                  ) && (
                    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 transition-all hover:shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-gray-100 p-2 rounded-md mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-gray-700">Informations complémentaires</h3>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {Object.entries(jsonData).map(
                            ([key, value]) => {
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
                                  className="flex flex-col bg-white p-2 rounded border border-gray-100"
                                >
                                  <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                    {key}
                                  </span>
                                  <span className="font-medium break-words text-gray-800 mt-1">
                                    {String(value)}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          } catch (error) {
            // Fallback to raw JSON display if parsing fails
            return (
              <>
                <div className="font-semibold text-teal-800 mb-2">
                  Spec {selectedCaseIdx + 1} (format brut)
                </div>
                <pre className="whitespace-pre-wrap break-words overflow-auto auto-wrap code-block text-xs">
                  {outputDataArray[selectedCaseIdx]}
                </pre>
              </>
            );
          }
        })()}
      </div>
    ) : selectedNodeId && selectedNode ? (
      <div className="space-y-4 h-full overflow-auto">
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
          <h3 className="text-lg font-medium mb-1 text-teal-900 break-words">
            {selectedNode?.title}
          </h3>
          <div className="text-xs text-teal-700 mb-2">
            {selectedNode?.path} • {selectedNode?.type}
          </div>
          {selectedNode?.content && (
            <p className="text-sm mt-2 text-teal-800 whitespace-pre-wrap break-words">
              {selectedNode.content}
            </p>
          )}
        </div>

        {selectedNodeFeatures.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-teal-800">
              Detected Features
            </h3>
            {selectedNodeFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                sourceNode={selectedNode}
                onValidate={handleFeatureValidation}
                onEdit={handleFeatureEdit}
                onDelete={handleFeatureDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border p-8 text-center text-teal-400 border-teal-200 bg-white/60">
            No features detected for this {selectedNode?.type}
          </div>
        )}
      </div>
    ) : (
      <div className="flex items-center justify-center h-full text-teal-400">
        Select a node to view its details and features
      </div>
    )}
  </div>
</ResizablePanel>
