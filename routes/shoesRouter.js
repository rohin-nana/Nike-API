import express from 'express';
const router = express.Router();
import { getShoes, getSavedShoes } from '../controllers/shoesController.js'

router.route('/getShoes').get(getShoes);
router.route('/getSavedShoes').get(getSavedShoes);

export default router