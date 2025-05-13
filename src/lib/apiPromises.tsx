import { scheduledContent } from "@/components/dashboard/UploadSheet";

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
  const response = await fetch("http://localhost:3000/content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};
