import { serverSupabaseClient } from '#supabase/server'

interface ProtectedRoute {
  path: string;
  methods?: string[]; // If not specified, all methods are protected
}

export default defineEventHandler(async (event) => {
  // Define protected routes with granular method control
  const protectedRoutes: ProtectedRoute[] = [
    {
      path: '/api/car/create',
      methods: ['POST'] // Only POST method requires auth
    },
    {
      path: '/api/car/inquiries',
      methods: ['POST'] // Only POST method requires auth, GET is public
    },
    {
      path: '/api/user',
      methods: ['POST', 'PUT', 'DELETE'] // Allow GET without auth, protect write operations
    }
  ];

  const url = event.node.req.url;
  const method = event.node.req.method?.toUpperCase();

  // Special handling for car inquiries route - requires auth for GET method
  const isInquiriesRoute = url?.match(/\/api\/car\/\d+\/inquiries/);

  // Check if current request matches any protected route
  const matchedRoute = protectedRoutes.find(route => {
    const pathMatches = url?.startsWith(route.path);
    const methodMatches = !route.methods || route.methods.length === 0 || route.methods.includes(method || '');
    return pathMatches && methodMatches;
  });

  // If route is protected OR it's the inquiries route, check authentication
  if (matchedRoute || isInquiriesRoute) {
    const client = await serverSupabaseClient(event);
    const { data, error } = await client.auth.getUser();

    if (error || !data.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "User is not authenticated !!!"
      });
    }

    // Attach user to context for use in other handlers
    event.context.user = data.user;
  } else {
    // For non-protected routes, still try to get user but don't throw error
    try {
      const client = await serverSupabaseClient(event);
      const { data } = await client.auth.getUser();
      event.context.user = data.user || null;
    } catch {
      event.context.user = null;
    }
  }

  // console.log("Request:", method, url, "User:", event.context.user?.id || 'anonymous');
});