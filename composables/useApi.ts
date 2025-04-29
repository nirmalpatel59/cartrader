import type { UseFetchOptions } from 'nuxt/app';

type ApiOptions<T> = {
  method?: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'patch' | 'PATCH';
  body?: any;
  query?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  immediate?: boolean;
  watch?: boolean;
  onResponse?: (response: any) => void;
  onResponseError?: (error: any) => void;
  onRequest?: (request: any) => void;
  onRequestError?: (error: any) => void;
} & Omit<UseFetchOptions<T>, 'method' | 'body' | 'query' | 'headers'>;

/**
 * A wrapper around useFetch that provides a consistent API for making HTTP requests
 * @param url The URL to fetch from (can be relative to the API base URL)
 * @param options Options for the fetch request
 * @returns The result of useFetch with additional helper methods
 */
export function useApi<T extends Record<string, any> | void>(url: string, options: ApiOptions<T> = {}) {
  const config = useRuntimeConfig();

  // Define default options
  const defaults: ApiOptions<T> = {
    method: 'get',
    watch: false,
    immediate: true,
    retry: 1,
    onResponse: undefined,
    onResponseError: undefined,
    onRequest: undefined,
    onRequestError: undefined,
  };

  // Merge provided options with defaults
  const fetchOptions = {
    ...defaults,
    ...options,
    // Handle API-specific options
    onResponse: ({ response }: { response: any }) => {
      // Custom response handling can go here
      // For example, check for specific error codes
      if (options.onResponse) {
        options.onResponse(response as any);
      }
    },
    onResponseError: ({ response }: { response: any }) => {
      // Handle response errors
      console.error('API response error:', response.status, response._data);
      if (options.onResponseError) {
        options.onResponseError(response);
      }
    },
    onRequest: ({ request, options: requestOptions }: { request: Request, options: RequestInit }) => {
      // Modify request before it's sent
      if (options.onRequest) {
        options.onRequest({ request, options: requestOptions });
      }
    },
    onRequestError: ({ request, error }: { request: Request; error: any }) => {
      // Handle request errors
      console.error('API request error:', error);
      if (options.onRequestError) {
        options.onRequestError({ request, error });
      }
    },
  };

  // If there's a query object, handle it
  if (options.query) {
    fetchOptions.query = options.query;
  }

  // Determine if the URL is absolute or relative
  const isAbsoluteUrl = url.startsWith('http') || url.startsWith('//');
  
  // Use the appropriate URL
  const fetchUrl = isAbsoluteUrl ? url : `/api${url.startsWith('/') ? url : `/${url}`}`;

  return useFetch<T>(fetchUrl, fetchOptions as any);
}

/**
 * Shorthand for GET requests
 */
export function useApiGet<T extends Record<string, any> | void>(url: string, options: Omit<ApiOptions<T>, 'method'> = {}) {
  return useApi<T>(url, { ...options, method: 'get' });
}

/**
 * Shorthand for POST requests
 */
export function useApiPost<T extends Record<string, any> | void>(url: string, body: any, options: Omit<ApiOptions<T>, 'method' | 'body'> = {}) {
  return useApi<T>(url, { ...options, method: 'post', body });
}

/**
 * Shorthand for PUT requests
 */
export function useApiPut<T extends Record<string, any> | void>(url: string, body: any, options: Omit<ApiOptions<T>, 'method' | 'body'> = {}) {
  return useApi<T>(url, { ...options, method: 'put', body });
}

/**
 * Shorthand for DELETE requests
 */
export function useApiDelete<T extends Record<string, any> | void>(url: string, options: Omit<ApiOptions<T>, 'method'> = {}) {
  return useApi<T>(url, { ...options, method: 'delete' });
}

/**
 * Shorthand for PATCH requests
 */
export function useApiPatch<T extends Record<string, any> | void>(url: string, body: any, options: Omit<ApiOptions<T>, 'method' | 'body'> = {}) {
  return useApi<T>(url, { ...options, method: 'patch', body });
}