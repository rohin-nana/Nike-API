import Shoe from '../models/Shoe.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'

async function getShoes(req, res, next) {
    try {
        const { name, gender } = req.query;
        if (name && !gender || gender && !name) {
            return next(new BadRequestError("Please provide both value or none"));
        }
        if (!name) {
            const shoes = await Shoe.find();
            res.status(StatusCodes.OK).json({ "shoes": shoes.slice(0, 40) });
        }

        const splitName = name.split(" ");
        for (let i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i][0].toUpperCase() + splitName[i].substr(1);
        }
        const newName = splitName.join(" ");
        
        const shoes = await Shoe.find({ name: { $regex: `.*${newName}.*`}, gender });
        res.status(StatusCodes.OK).json({ "shoes": shoes.slice(0, 40) });

    } catch(error) {
        return next(error);
    }
}

async function getSavedShoes(req, res, next) {
    try {
        const { image } = req.query;
        if ( !image ) {
            return next(new BadRequestError("Please provide both value or none"));
        }
        console.log(image);
        
        const shoe = await Shoe.findOne({ image: `${image}` });
        res.status(StatusCodes.OK).json(shoe);

    } catch(error) {
        return next(error);
    }
}

export { getShoes, getSavedShoes };