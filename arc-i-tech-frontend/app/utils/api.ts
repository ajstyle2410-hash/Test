export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const apiFetch = async <T>(
  url: string,
  options: {
    method?: string;
    token?: string;
    body?: string;
  } = {}
): Promise<{ data: T }> => {
  const { method = 'GET', token, body } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return { data };
};