import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const params = event.context.params || {};
  const id = params.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid car Id',
    });
  }
  const car = await prisma.listing.findUnique({
    where: {
      id: +id,
    }
  });
  console.log('listingData >> ', car);
  return car;
});