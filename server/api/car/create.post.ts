import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client.auth.getUser();
  
  if (error || !data.user) { 
    return {
      statusCode: 401,
      message: "User is not authenticated",
    }
  }
  
  try {
    const body = await readBody(event);
    const listing = await prisma.listing.create({
      data: {
        ...body,
        userId: data.user.id,
      },
    });
    
    return {
      statusCode: 200,
      body: listing
    };
  } catch (createError: any) {
    return {
      statusCode: 500,
      message: "Failed to create listing",
      error: createError.message
    };
  }
});