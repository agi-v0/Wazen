import * as z from 'zod'

export interface ActionResponse<T = any> {
	success: boolean
	message: string
	errors?: {
		[K in keyof T]?: string[]
	}
	inputs?: T
}
export const formSchema = z.object({
	firstName: z.string({ error: 'This field is required' }),
	lastName: z.string().optional(),
	companyName: z.string().optional(),
	industry: z.string().optional(),
	email: z.email({ error: 'Please enter a valid email' }),
	mobileNumber: z.string({ error: 'Please enter a valid number' }),
	message: z.string({ error: 'This field is required' }).optional(),
	agree: z.literal(true, { error: 'This field is required' }),
})
