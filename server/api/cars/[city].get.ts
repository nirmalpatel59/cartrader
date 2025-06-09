// import cars from "@/data/cars.json";
// get car listing by city
// optional filters: make, minPrice, maxPrice
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { city } = event.context.params as { city: string };
  const { make, minPrice, maxPrice } = getQuery(event);
  const query: {
    city: object;
    make?: string;
    price?: any;
    archive: boolean;
  } = {
    archive: false,
    city: {
      equals: city, // Assuming you want to filter out archived listings
      mode: 'insensitive' // Case insensitive search for city
    }
  };
  if(make) query.make = String(make);
  if(minPrice && maxPrice) query.price = {
    gte: +minPrice,
    lte: +maxPrice,
  };
  else if (minPrice && !maxPrice) query.price = {
    gte: +minPrice,
  };
  else if (maxPrice && !minPrice) query.price = {
    lte: +maxPrice,
  };
  console.log('query >> ', query);
  const listings = await prisma.listing.findMany({
    where: query
  });
  

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