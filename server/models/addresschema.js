import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
