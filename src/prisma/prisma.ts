import { PrismaClient } from '@prisma/client'

type MyPoint = {
  latitude: number
  longitude: number
}

type MyPointOfInterest = {
  name: string
  location: MyPoint
}

const prisma = new PrismaClient().$extends({
  model: {
    pointOfInterest: {
      async create(data: {
        name: string
        latitude: number
        longitude: number
      }) {
        // Create an object using the custom types from above
        const poi: MyPointOfInterest = {
          name: data.name,
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
        }

        // Insert the object into the database
        const point = `POINT(${poi.location.longitude} ${poi.location.latitude})`
        await prisma.$queryRaw`
          INSERT INTO "PointOfInterest" (name, location) VALUES (${poi.name}, ST_GeomFromText(${point}, 4326));
        `

        // Return the object
        return poi
      },
    },
  },
})

