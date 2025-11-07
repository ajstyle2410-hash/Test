const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type FetchOptions = {
  method?: string;
  body?: string;
  token?: string;
  headers?: Record<string, string>;
};

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<{ data: T; message?: string }> {
  const {
    method = 'GET',
    body,
    token,
    headers = {},
  } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body,
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unexpected error occurred',
    }));
    throw new Error(error.message);
  }

  return response.json();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return formatDate(dateString);
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}