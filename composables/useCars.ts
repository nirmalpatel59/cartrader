import cars from "@/data/cars.json";
import makes from "@/data/makes.json";
// import listings from "@/data/listings.json";

export const useCars = async () => {
  const { data: listings, error} = await useApi('/cars');
  return {
    cars,
    makes,
    listings,
  };
};
