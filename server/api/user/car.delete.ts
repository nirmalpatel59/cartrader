// Archive user's car from listings
import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  // const client = await serverSupabaseClient(event);
  // const { data, error } = await client.auth.getUser();
  // if (error) {
  //   return {
  //     statusCode: 404,
  //     message: "UserId not found",
  //   }
  // }
console.log(event.context);
  const { listingId } = getQuery(event) // Accesses the 'myParam' query parameter
  // const { listingId } = event.context.query as { listingId: string }; // Assuming the ID is passed in the URL params
  if(!listingId || isNaN(+listingId)) {
    return {
      statusCode: 400,
      message: "Invalid listing ID",
    }
  }
  const listings = await prisma.listing.update({
    where: {
      id: +listingId, // Assuming the ID is passed in the URL params
    },
    data: {
      archive: true, // Set the archived field to true
    },
  });
  console.log('archived listing >> ', listings);
  
  // const { city } = event.context.params as { city: string };
  // const { make, minPrice, maxPrice } = getQuery(event);
  // const filteredCars = cars.filter((car) => {
  //   if (car.city.toLowerCase() !== city.toLowerCase()) {
  //     return false;
  //   }
  //   if (make as string && car.make.toLowerCase() !== (make as string).toLowerCase()) {
  //     return false;
  //   }
  //   if (minPrice && car.price < +minPrice) {
  //     return false;
  //   }
  //   if (maxPrice && car.price > +maxPrice) {
  //     return false;
  //   }
  //   return true;
  // });
  // if (filteredCars.length === 0) {
  //   return {
  //     statusCode: 404,
  //     message: "No cars found",
  //   }
  // }
  // return filteredCars;
  return listings;
});