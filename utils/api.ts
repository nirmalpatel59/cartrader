import type { FetchOptions, FetchError } from 'ofetch';

type ApiResponse<T> = {
  data: T | null;
  error: Error | FetchError | null;
  status: number | null;
};

type ApiRequestOptions = {
  method?: 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 
           'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace';
  body?: any;
  query?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  onRequest?: (ctx: { request: Request; options: FetchOptions }) => void;
  onRequestError?: (ctx: { request: Request; options: FetchOptions; error: FetchError }) => void;
  onResponse?: (ctx: { request: Request; options: FetchOptions; response: Response }) => void;
  onResponseError?: (ctx: { request: Request; response: Response; options: FetchOptions }) => void;
} & Omit<FetchOptions, 'method' | 'body' | 'query' | 'headers'>;

/**
 * Wrapper around $fetch for making imperative API calls
 * @param url The URL to fetch from
 * @param options Options for the fetch request
 * @returns A promise that resolves to the response data or error
 */
export async function api<T = any>(url: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
  // Default response
  const response: ApiResponse<T> = {
    data: null,
    error: null,
    status: null
  };

  // Apply default options
  const defaultOptions: ApiRequestOptions = {
    method: 'GET',
    retry: 1,
  };

  // Merge options
  const fetchOptions = {
    ...defaultOptions,
    ...options,
  } as const;

  // Determine if the URL is absolute or relative
  const isAbsoluteUrl = url.startsWith('http') || url.startsWith('//');
  
  // Use the appropriate URL
  const fetchUrl = isAbsoluteUrl ? url : `/api${url.startsWith('/') ? url : `/${url}`}`;

  try {
    // Make the API call
    const result = await $fetch<T>(fetchUrl, fetchOptions);
    
    // Set the response data
    response.data = result as T;
    response.status = 200; // Default success status
    
    return response;
  } catch (error) {
    if (error instanceof Error) {
      response.error = error;
      
      // Handle fetch errors with status codes
      if ('status' in error && typeof error.status === 'number') {
        response.status = error.status;
      }
    } else {
      // Create a generic error if it's not an Error instance
      response.error = new Error('An unknown error occurred');
    }
    
    return response;
  }
}

/**
 * Shorthand for GET requests
 */
export async function apiGet<T>(url: string, options: Omit<ApiRequestOptions, 'method'> = {}): Promise<ApiResponse<T>> {
  return api<T>(url, { ...options, method: 'GET' });
}

/**
 * Shorthand for POST requests
 */
export async function apiPost<T>(url: string, body: any, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
  return api<T>(url, { ...options, method: 'POST', body });
}

/**
 * Shorthand for PUT requests
 */
export async function apiPut<T>(url: string, body: any, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
  return api<T>(url, { ...options, method: 'PUT', body });
}

/**
 * Shorthand for DELETE requests
 */
export async function apiDelete<T>(url: string, options: Omit<ApiRequestOptions, 'method'> = {}): Promise<ApiResponse<T>> {
  return api<T>(url, { ...options, method: 'DELETE' });
}

/**
 * Shorthand for PATCH requests
 */
export async function apiPatch<T>(url: string, body: any, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
  return api<T>(url, { ...options, method: 'PATCH', body });
}