import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Only apply auth to API routes that need protection
  // const protectedRoutes: string[] = [];
  const protectedRoutes = [
    '/api/car/create',
    '/api/user'
  ];
  
  if (protectedRoutes.some(route => event.node.req.url?.startsWith(route))) {
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
  }
});