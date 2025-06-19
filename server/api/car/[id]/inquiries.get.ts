import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const carId = getRouterParam(event, 'id');
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const offset = (page - 1) * limit;

  // Get user from context (available from auth middleware)
  const user = event.context.user;

  if (!carId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Car ID is required'
    });
  }

  try {
    // For authenticated users, show only their inquiries for this car
    // For unauthenticated users, this endpoint should return empty or be blocked by middleware
    if (!user) {
      return {
        data: [],
        pagination: {
          page: 1,
          limit: limit,
          total: 0,
          hasMore: false
        }
      };
    }

    // TODO: Replace with actual database query
    // Example with Prisma:
    const inquiries = await prisma.sale_inquiries.findMany({
      where: {
        listingId: parseInt(carId),
        userId: user.id // Only show user's own inquiries
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: limit
    });

    // const total = await prisma.vehicleInquiry.count({
    //   where: {
    //     carId: parseInt(carId),
    //     userId: user.id
    //   }
    // });

    // Mock data for now - replace with actual database query
    // const mockInquiries = [
    //   {
    //     id: '1',
    //     carId: parseInt(carId),
    //     userId: user.id,
    //     name: 'John Doe',
    //     email: user.email || 'user@example.com',
    //     phone: '+1 (555) 123-4567',
    //     offerPrice: 25000,
    //     message: 'Hi, I am interested in this car. Is it still available? I would like to schedule a test drive. Can we negotiate on the price?',
    //     status: 'responded',
    //     createdAt: '2024-01-15T10:30:00Z',
    //     updatedAt: '2024-01-16T14:20:00Z',
    //     sellerResponse: {
    //       message: 'Hello! Yes, the car is still available. I would be happy to arrange a test drive. The price is slightly negotiable. Please call me at your convenience.',
    //       createdAt: '2024-01-16T14:20:00Z'
    //     }
    //   },
    //   {
    //     id: '2',
    //     carId: parseInt(carId),
    //     userId: user.id,
    //     name: 'Jane Smith',
    //     email: user.email || 'user@example.com',
    //     phone: '+1 (555) 987-6543',
    //     offerPrice: 23500,
    //     message: 'Hello, I saw your car listing and I am very interested. Does it come with a warranty? Also, has it been in any accidents?',
    //     status: 'sent',
    //     createdAt: '2024-01-18T09:15:00Z',
    //     updatedAt: '2024-01-18T09:15:00Z'
    //   }
    // ];
    // const mockInquiries = inquiries;
    // // Filter mock data based on pagination
    // const startIndex = offset;
    // const endIndex = startIndex + limit;
    // const paginatedInquiries = mockInquiries.slice(startIndex, endIndex);
    // const total = mockInquiries.length;

    // return {
    //   data: paginatedInquiries,
    //   pagination: {
    //     page: page,
    //     limit: limit,
    //     total: total,
    //     hasMore: (page * limit) < total
    //   }
    // };
    return inquiries

  } catch (error) {
    console.error('Error fetching car inquiries:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inquiries'
    });
  }
});
