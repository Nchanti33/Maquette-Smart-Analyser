import React, { useState } from "react";
import { sendDocumentToExternalApi } from "../services/externalApiService";

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<string>("");
  const [workflowVarName, setWorkflowVarName] = useState<string>("");
  const [workflowId, setWorkflowId] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file && user && workflowVarName && workflowId) {
      try {
        await sendDocumentToExternalApi(
          file,
          user,
          workflowVarName,
          workflowId
        );
      } catch (error) {
        console.error("Error sending document to external API:", error);
      }
    } else {
      alert("Please provide all required fields.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="User"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Workflow Variable Name"
        value={workflowVarName}
        onChange={(e) => setWorkflowVarName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Workflow ID"
        value={workflowId}
        onChange={(e) => setWorkflowId(e.target.value)}
      />
      <button onClick={handleFileUpload}>Upload Document</button>
    </div>
  );
};

export default DocumentUpload;
