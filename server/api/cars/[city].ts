import cars from "@/data/cars.json";
export default defineEventHandler((event) => {
  const { city } = event.context.params as { city: string };
  const { make, minPrice, maxPrice } = getQuery(event);
  const filteredCars = cars.filter((car) => {
    if (car.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }
    if (make as string && car.make.toLowerCase() !== (make as string).toLowerCase()) {
      return false;
    }
    if (minPrice && car.price < +minPrice) {
      return false;
    }
    if (maxPrice && car.price > +maxPrice) {
      return false;
    }
    return true;
  });
  if (filteredCars.length === 0) {
    return {
      statusCode: 404,
      message: "No cars found",
    }
  }
  return filteredCars;
});