// fields.schema.ts
import { z } from 'zod';

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters');
export const dobSchema = z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
  message: 'Date of birth must be in YYYY-MM-DD format',
});
export const countrySchema = z.string().min(2, 'Country name must be valid');
export const emailSchema = z.string().email('Invalid email format');