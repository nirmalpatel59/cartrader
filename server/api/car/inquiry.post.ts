import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    // console.log('request data >>> ', body);
    const reqBody = {
      listingId: +body.id,
      message: body.message,
      name: body.name,
      email: body.email,
      phone: body.phone,
      price: body.offerPrice,
    }
    console.log('create sale inquiry body >> ', reqBody);
    const saleInquiries = await prisma.sale_inquiries.create({
      data: {
        ...reqBody,
        userId: event.context.user?.id || body.userId, // Use userId from Supabase or from body if available
      },
    });

    return {
      statusCode: 200,
      body: saleInquiries
    };
  } catch (createError: any) {
    return {
      statusCode: 500,
      message: "Failed to create listing",
      error: createError.message
    };
  }
});