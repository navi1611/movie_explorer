const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

function buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = `${API_BASE_URL}${endpoint}`;

  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
}

async function fetchHelper<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers = {}, ...fetchOptions } = options;

  const url = buildUrl(endpoint, params);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders,
    });

    const status = response.status;
    let data: T | undefined;
    let error: string | undefined;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      if (response.ok) {
        data = json;
      } else {
        error = json.detail || json.message || 'An error occurred';
      }
    } else {
      const text = await response.text();
      if (response.ok) {
        data = text as any;
      } else {
        error = text || 'An error occurred';
      }
    }

    if (!response.ok && !error) {
      error = `HTTP error! status: ${status}`;
    }

    return {
      data,
      error,
      status,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Network error occurred',
      status: 0,
    };
  }
}

export async function get<T = any>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  options?: Omit<FetchOptions, 'method' | 'body' | 'params'>
): Promise<ApiResponse<T>> {
  return fetchHelper<T>(endpoint, {
    ...options,
    method: 'GET',
    params,
  });
}

export async function post<T = any>(
  endpoint: string,
  body?: any,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> {
  return fetchHelper<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function put<T = any>(
  endpoint: string,
  body?: any,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> {
  return fetchHelper<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function patch<T = any>(
  endpoint: string,
  body?: any,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> {
  return fetchHelper<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function del<T = any>(
  endpoint: string,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> {
  return fetchHelper<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

export default fetchHelper;

