# Seeding Script

This script seeds the Supabase database with dummy car listings using the images from `/public/img/cars/` folder.

## What it does:
1. Uploads car images to Supabase Storage (bucket: `images`)
2. Creates car listings in the database with all required fields
3. Creates or uses a test user for the listings

## Required fields (from create.vue):
- make
- model
- year (number)
- miles (number)
- price (number)
- city
- seats (number)
- features
- description
- image (uploaded to Supabase storage)
- userId (auto-generated test user)

## Before running:
Make sure you have the following environment variables set:
- `SUPABASE_URL` (or it will use the default from nuxt.config.ts)
- `SUPABASE_SERVICE_KEY` or `SUPABASE_KEY` (service key preferred for admin operations)
- `DATABASE_URL` (for Prisma)

## How to run:

### Option 1: Using npm script
```bash
npm run seed
```

### Option 2: Direct node execution
```bash
node scripts/seedData.js
```

## Sample data:
The script creates 5 car listings:
1. Audi A4 (2021) - $45,000
2. Bentley Continental GT (2020) - $180,000
3. BMW M3 (2022) - $75,000
4. Mercedes-Benz S-Class (2021) - $95,000
5. Land Rover Range Rover (2020) - $85,000

Each listing includes realistic features, descriptions, and uses actual images from the `/public/img/cars/` folder.

## Troubleshooting:
- If you get image upload errors, check your Supabase storage bucket permissions
- If you get user creation errors, make sure your Supabase service key has admin permissions
- If you get database errors, ensure Prisma is properly configured and migrations are up to date
