// import cars from "@/data/cars.json";
// get user's car listings
import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client.auth.getUser();
  if (error) { 
    return {
      statusCode: 404,
      message: "UserId not found",
    }
  }
  // console.log('user data >> ', data);
  const listings = await prisma.listing.findMany({
    where: {
      userId: data?.user?.id,
      archive: false
    }
  });
    console.log('listings data >> ', listings.length);
  
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