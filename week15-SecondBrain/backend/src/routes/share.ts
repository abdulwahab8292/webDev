import {Router, Request, Response} from 'express';
import { UserAuth } from '../middleware/UserAuth';

const router = Router();

router.post('/brain/share', UserAuth, async(req: Request, res: Response) => {
    
})