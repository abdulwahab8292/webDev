import {z} from 'zod';
import {passwordSchema} from './shared/password.schema';
import {nameSchema, dobSchema, countrySchema, emailSchema} from './shared/fields.schema';
/**
 * Definig the schema for user registration and signup
*/
export const signupSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    dob: dobSchema,
    country: z.string().min(2, 'Country name must be valid'),
    email: emailSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string()
  })

  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'Passwords do not match',
      });
    }
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})