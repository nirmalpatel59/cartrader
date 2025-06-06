#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://jmkskegtuhgpubyncnca.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize Prisma client
const prisma = new PrismaClient()

// Dummy data for car listings
const carData = [
  {
    make: 'Audi',
    model: 'A4',
    year: 2021,
    miles: 25000,
    price: 45000,
    city: 'Austin',
    seats: 5,
    features: 'Leather Interior, Sunroof, Premium Sound System, No Accidents',
    description: 'Beautiful Audi A4 in excellent condition. Well maintained with regular service history. Perfect for daily commuting or weekend trips.',
    imageName: 'audi.jpg'
  },
  {
    make: 'Bentley',
    model: 'Continental GT',
    year: 2020,
    miles: 15000,
    price: 180000,
    city: 'Dallas',
    seats: 4,
    features: 'Premium Leather, Carbon Fiber Interior, Adaptive Cruise Control, Luxury Package',
    description: 'Luxurious Bentley Continental GT with pristine condition. Low mileage and exceptional performance. A true masterpiece of automotive engineering.',
    imageName: 'bentley-1.jpeg'
  },
  {
    make: 'BMW',
    model: 'M3',
    year: 2022,
    miles: 8000,
    price: 75000,
    city: 'Houston',
    seats: 5,
    features: 'Sport Package, M Performance Exhaust, Carbon Fiber Trim, Track Ready',
    description: 'High-performance BMW M3 with incredible driving dynamics. Low mileage, garage kept, and ready for the track or street.',
    imageName: 'bmw.jpg'
  },
  {
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2021,
    miles: 20000,
    price: 95000,
    city: 'San Antonio',
    seats: 5,
    features: 'Massage Seats, Panoramic Roof, Advanced Driver Assistance, Premium Audio',
    description: 'Executive Mercedes-Benz S-Class offering unparalleled luxury and comfort. Perfect for business or pleasure with cutting-edge technology.',
    imageName: 'mercedes.jpg'
  },
  {
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2020,
    miles: 30000,
    price: 85000,
    city: 'Fort Worth',
    seats: 7,
    features: 'All-Terrain Capability, Luxury Interior, Tow Package, Off-Road Ready',
    description: 'Versatile Range Rover combining luxury with capability. Perfect for families who want comfort and adventure in one vehicle.',
    imageName: 'range-rover.jpg'
  }
]

// Function to upload image to Supabase storage
async function uploadImageToSupabase(imageName) {
  try {
    const imagePath = path.join(__dirname, '..', 'public', 'img', 'cars', imageName)
    
    if (!fs.existsSync(imagePath)) {
      console.error(`Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(imagePath)
    const fileName = `${Date.now()}`
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, imageBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: `image/${path.extname(imageName).slice(1)}`
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    console.log(`✅ Image uploaded successfully: ${fileName}`)
    return data.fullPath
  } catch (error) {
    console.error('Error in uploadImageToSupabase:', error)
    return null
  }
}

// Function to create car listing
async function createCarListing(carInfo, imagePath, userId) {
  try {
    const listing = await prisma.listing.create({
      data: {
        make: carInfo.make,
        model: carInfo.model,
        year: carInfo.year,
        miles: carInfo.miles,
        price: carInfo.price,
        city: carInfo.city,
        seats: carInfo.seats,
        features: carInfo.features,
        description: carInfo.description,
        image: imagePath,
        userId: userId
      }
    })

    console.log(`✅ Car listing created: ${carInfo.make} ${carInfo.model} (ID: ${listing.id})`)
    return listing
  } catch (error) {
    console.error('Error creating car listing:', error)
    return null
  }
}

// Function to get or create a test user
async function getTestUserId() {
  try {
    return 'cead5f6b-3c5f-4e0c-a16d-58b858dad84d'
    // // Try to create a test user or get existing one
    // const testEmail = 'test@cartrader.com'
    
    // // Check if user exists
    // const { data: authData, error: authError } = await supabase.auth.admin.listUsers()
    
    // if (authError) {
    //   console.error('Error fetching users:', authError)
    //   // Fallback to a dummy UUID if we can't access auth
    //   return '00000000-0000-0000-0000-000000000000'
    // }

    // let testUser = authData.users.find(user => user.email === testEmail)
    
    // if (!testUser) {
    //   // Create test user
    //   const { data: newUserData, error: createError } = await supabase.auth.admin.createUser({
    //     email: testEmail,
    //     password: 'testpassword123',
    //     email_confirm: true
    //   })
      
    //   if (createError) {
    //     console.error('Error creating test user:', createError)
    //     // Fallback to a dummy UUID
    //     return '00000000-0000-0000-0000-000000000000'
    //   }
      
    //   testUser = newUserData.user
    //   console.log(`✅ Test user created: ${testEmail}`)
    // } else {
    //   console.log(`✅ Using existing test user: ${testEmail}`)
    // }

    // return testUser.id
  } catch (error) {
    console.error('Error in getTestUserId:', error)
    // Fallback to a dummy UUID
    return '00000000-0000-0000-0000-000000000000'
  }
}

// Main seeding function
async function seedData() {
  console.log('🌱 Starting data seeding...')
  
  try {
    // Get test user ID
    const userId = await getTestUserId()
    console.log(`Using user ID: ${userId}`)

    // Process each car
    for (const car of carData) {
      console.log(`\n📝 Processing ${car.make} ${car.model}...`)
      
      // Upload image to Supabase
      const imagePath = await uploadImageToSupabase(car.imageName)
      
      if (!imagePath) {
        console.error(`❌ Failed to upload image for ${car.make} ${car.model}`)
        continue
      }

      // Create car listing
      const listing = await createCarListing(car, imagePath, userId)
      
      if (!listing) {
        console.error(`❌ Failed to create listing for ${car.make} ${car.model}`)
        continue
      }
    }

    console.log('\n✅ Data seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding script
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData()
    .then(() => {
      console.log('🎉 Seeding script finished!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Seeding script failed:', error)
      process.exit(1)
    })
}

export { seedData }
