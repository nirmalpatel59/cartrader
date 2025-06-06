import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data } = await client.auth.getUser();

  
  try {
    const body = await readBody(event);
    console.log('create listing body >> ', body);
    const listing = await prisma.listing.create({
      data: {
        ...body,
        userId: data?.user?.id || body.userId, // Use userId from Supabase or from body if available
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