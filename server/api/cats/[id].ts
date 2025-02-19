import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.method
  const { params } = event.context

  if (!params || !params.id) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: 'Invalid request: missing id parameter',
    }
  }
  const { id } = params

  if (method === 'PUT') {
    try {
      const body = await readBody(event)

      const updatedCat = await prisma.cat.update({
        where: { id: Number(id) },
        data: {
          name: body.name,
          description: body.description,
          image: body.image,
        },
      })

      return {
        success: true,
        data: updatedCat,
      }
    } catch (error) {
      setResponseStatus(event, 400)
      return {
        success: false,
        error: (error instanceof Error) ? error.message : 'An unknown error occurred',
      }
    }
  }

  if (method === 'DELETE') {
    try {
      const deletedCat = await prisma.cat.delete({
        where: { id: Number(id) },
      })

      return {
        success: true,
        data: deletedCat,
      }
    } catch (error) {
      setResponseStatus(event, 400)
      return {
        success: false,
        error: (error instanceof Error) ? error.message : 'An unknown error occurred',
      }
    }
  }

  setResponseStatus(event, 405)
  return {
    success: false,
    error: 'Method not allowed',
  }
})