import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    try {
      const query = getQuery(event)

      const page = Number(query.page) || 1
      const limit = Number(query.limit) || 1
      const skip = (page - 1) * limit

      const cats = await prisma.cat.findMany({
        skip,
        take: limit,
      })

      const totalCats = await prisma.cat.count()
      const totalPages = Math.ceil(totalCats / limit)

      return {
        success: true,
        data: cats,
        pagination: {
          page,
          limit,
          totalCats,
          totalPages,
        },
      }
    } catch (error) {
      setResponseStatus(event, 500)
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      }
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      if (!body.name) {
        throw new Error('Name is required')
      }
      const newCat = await prisma.cat.create({
        data: {
          name: body.name,
          description: body.description,
          image: body.image,
        },
      })
      return {
        success: true,
        data: newCat,
      }
    } catch (error) {
      setResponseStatus(event, 400)
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      }
    }
  }

  setResponseStatus(event, 405)
  return {
    success: false,
    error: 'Method not allowed',
  }
})
