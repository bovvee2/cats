import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const adoptionFormSchema = z.object({
  fullname: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  telephone: z.string().min(1, { message: 'Telephone is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  catId: z.number(),
})

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    try {
      const adoptionForms = await prisma.adoptionForm.findMany()
      return {
        statusCode: 200,
        body: adoptionForms,
      }
    } catch (error) {
      console.error('Error fetching adoption forms:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)

    try {
      adoptionFormSchema.parse(JSON.parse(body))
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Validation Error',
          data: error.errors,
        })
      }
    }

    try {
      const adoptionForm = await prisma.adoptionForm.create({
        data: {
          fullname: body.fullname,
          email: body.email,
          telephone: body.telephone,
          description: body.description,
          catId: body.catId,
        },
      })

      return {
        statusCode: 201,
        body: adoptionForm,
      }
    } catch (error) {
      console.error('Error creating adoption form:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  })
})
