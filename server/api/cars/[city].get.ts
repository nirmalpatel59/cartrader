// import cars from "@/data/cars.json";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { city } = event.context.params as { city: string };
  const { make, minPrice, maxPrice } = getQuery(event);
  const query: {
    city: string;
    make?: string;
    price?: any;
  } = {
    city: city,
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
  const listings = prisma.listing.findMany({
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