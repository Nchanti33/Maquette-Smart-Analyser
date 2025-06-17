import { useState } from "react";

export async function sendDocumentToExternalApi(
  file: File,
  user: string,
  workflowVarName: string,
  workflowId: string
): Promise<any> {
  try {
    // 1. Upload the file to Dify
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("user", user);
    console.log("Uploading file to Dify /files/upload", file);
    const uploadRes = await fetch("https://api.dify.ai/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer app-3l2yJBxafYta2TTNJAyC3OQ0",
      },
      body: uploadForm,
    });
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("File upload failed:", errText);
      throw new Error("File upload failed: " + errText);
    }
    const uploadData = await uploadRes.json();
    const fileId = uploadData.id;
    console.log("File uploaded, fileId:", fileId);

    // 2. Run the workflow with the uploaded file
    let workflowBody;
    let triedArray = false;
    let triedDirectId = false;
    let workflowRes, workflowResult;
    // Try with single object (Dify doc alternative)
    workflowBody = {
      inputs: {
        [workflowVarName]: {
          transfer_method: "local_file",
          upload_file_id: fileId,
          type: "document",
        },
      },
      response_mode: "blocking",
      user: user,
    };
    console.log("Running workflow with single object:", workflowBody);
    workflowRes = await fetch(`https://api.dify.ai/v1/workflows/run`, {
      method: "POST",
      headers: {
        Authorization: "Bearer app-3l2yJBxafYta2TTNJAyC3OQ0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflowBody),
    });
    if (!workflowRes.ok) {
      const errText = await workflowRes.text();
      console.error("Workflow execution failed (single object):", errText);
      // Try with array of object
      workflowBody = {
        inputs: {
          [workflowVarName]: [
            {
              transfer_method: "local_file",
              upload_file_id: fileId,
              type: "document",
            },
          ],
        },
        response_mode: "blocking",
        user: user,
      };
      triedArray = true;
      console.log("Retrying workflow with array of object:", workflowBody);
      workflowRes = await fetch(`https://api.dify.ai/v1/workflows/run`, {
        method: "POST",
        headers: {
          Authorization: "Bearer app-3l2yJBxafYta2TTNJAyC3OQ0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowBody),
      });
      if (!workflowRes.ok) {
        const errText2 = await workflowRes.text();
        console.error("Workflow execution failed (array of object):", errText2);
        // Try with direct fileId if second attempt fails
        workflowBody = {
          inputs: {
            [workflowVarName]: fileId,
          },
          response_mode: "blocking",
          user: user,
        };
        triedDirectId = true;
        console.log("Retrying workflow with direct fileId:", workflowBody);
        workflowRes = await fetch(`https://api.dify.ai/v1/workflows/run`, {
          method: "POST",
          headers: {
            Authorization: "Bearer app-3l2yJBxafYta2TTNJAyC3OQ0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workflowBody),
        });
        if (!workflowRes.ok) {
          const errText3 = await workflowRes.text();
          console.error("Workflow execution failed (direct fileId):", errText3);
          throw new Error("Workflow execution failed: " + errText3);
        }
      }
    }
    workflowResult = await workflowRes.json();
    if (triedDirectId) {
      console.log("Workflow result (direct fileId):", workflowResult);
    } else if (triedArray) {
      console.log("Workflow result (array of object):", workflowResult);
    } else {
      console.log("Workflow result (single object):", workflowResult);
    }
    return workflowResult;
  } catch (error) {
    console.error("sendDocumentToExternalApi error:", error);
    throw error;
  }
}
