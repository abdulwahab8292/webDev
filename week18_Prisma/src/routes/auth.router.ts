import {Router} from 'express';
import {Request, Response} from 'express';
import { hashPassword } from '../domains/auth/crypto/hashPassword';
const router = Router();
import {signupSchema, loginSchema} from '../schemas/auth.schema';
import {client} from '../index';
router.post('/signup', (req:Request, res:Response) => {
    const parsedResult = signupSchema.safeParse(req.body);
    if (!parsedResult.success) {
        return res.status(400).json({errors: parsedResult.error});
    }
    const {firstName, lastName, dob, country, email, newPassword} = parsedResult.data;
    // Hash the password before storing it
    const hashedPassword = hashPassword(newPassword);
    
   return res.status(201).json({message: 'User registered successfully'});
});
router.post('/login', async (req:Request, res:Response) => {
    const parsedResult = loginSchema.safeParse(req.body);
    if (!parsedResult.success) {
        return res.status(400).json({errors: parsedResult.error});
    }
    const {email, password} = parsedResult.data;
    // Fetch user from the database (pseudo-code)
    const user = await client.user.findFirst({ where: { Email: email } });
    // if (!user || !(await comparePassword(password, user.password))) {
    //     return res.status(401).json({ message: 'Invalid email or password' });
    // }
    // Generate JWT or session (pseudo-code)
    return res.status(200).json({message: 'Login successful'});
})
