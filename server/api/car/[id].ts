import cars from '../../../data/cars.json';
export default defineEventHandler((event) => {
  const params = event.context.params || {};
  const id = params.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid car Id',
    });
  }
  
  const car = cars.find((car) => car.id === +id);
  return car;
});