import mongoose from 'mongoose';

const ShoeSchema = new mongoose.Schema({    
    name: String,
    gender: String,
    availableSizes: [String],
    unAvailableSizes: [String],
}, {collection: "shoes"});

export default mongoose.model('Shoe', ShoeSchema);