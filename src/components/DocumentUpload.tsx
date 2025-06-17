import React, { useState } from "react";
import { sendDocumentToExternalApi } from "../services/externalApiService";

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      try {
        const apiResult = await sendDocumentToExternalApi(file);
        // Stockez apiResult dans le state ou passez-le à la suite du process
        // (affichage à venir, ne pas modifier l'affichage pour l'instant)
        console.log("External API result:", apiResult);
      } catch (error) {
        console.error("Error sending document to external API:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Document</button>
    </div>
  );
};

export default DocumentUpload;
