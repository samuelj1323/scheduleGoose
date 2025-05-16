import { scheduledContent } from "@/components/UploadSheet";

export const getContentData = async (token: string | null) => {
  const headers: HeadersInit = {};
  if (token) {
    headers.authorization = token;
  }

  const response = await fetch("http://localhost:3000/content", {
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const postContentData = async (
  values: scheduledContent,
  token: string | null
) => {
  const headers: HeadersInit = {};

  if (token) {
    headers.authorization = token;
  }

  // Use FormData for file uploads
  const formData = new FormData();

  // Add text fields
  formData.append("postName", values.postName);
  formData.append("description", values.description);
  formData.append("publishDate", values.publishDate.toISOString());
  formData.append("createdDate", values.createdDate.toISOString());
  formData.append("platform", values.platform);
  formData.append("status", values.status || "pending");

  // Add file if it exists
  if (values.file) {
    formData.append("file", values.file);
  }

  const response = await fetch("http://localhost:3000/content", {
    method: "POST",
    headers: {
      ...headers,
      // Don't set Content-Type as it's automatically set with the correct boundary for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};
