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
	lastName: z.string({ error: 'This field is required' }),
	companyName: z.string(),
	industry: z.string(),
	email: z.email({ error: 'Please enter a valid email' }),
	mobileNumber: z.string(),
	message: z.string({ error: 'This field is required' }),
	agree: z.literal(true, { error: 'This field is required' }),
})
