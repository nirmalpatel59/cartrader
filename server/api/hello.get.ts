// import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
  const newUser = await prisma.user.create({
        data: {
            name: 'nameshake1',
            email: 'nameshake1@prisma.io',
        },
  });
  return 'newUser from get';
  
  // const client = await serverSupabaseClient(event);
  // const { data, error } = await client.auth.getUser();
  
  // if (error) { 
  //   return {
  //     statusCode: 401,
  //     message: "User is not authenticated",
  //   }
  // }
  
  // Read the car listing data from the request body
  // const body = await readBody(event);
  
  // try {
  //   // Create the listing with the user ID from the authenticated user
  //   const listing = await prisma.listing.create({
  //     data: {
  //       ...body,
  //       userId: data.user.id,
  //     },
  //   });
    
  //   return {
  //     statusCode: 201,
  //     body: listing
  //   };
  // } catch (createError: any) {
  //   return {
  //     statusCode: 500,
  //     message: "Failed to create listing",
  //     error: createError.message
  //   };
  // }
});