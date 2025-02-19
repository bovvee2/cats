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
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    })
  }

  const body = await readBody(event)

  try {
    console.log('@@@@@@@@@@@@', JSON.parse(body))
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
})