import Address from '../models/addresschema.js';
import Otp from '../models/userSchema.js'

// Add a new address
export const addAddressbyuserID = async (req, res) => {
  try {
    const { name, address1, address2, pincode, userID } = req.body;
    // console.log(req.body);
    

    // Validate input
    if (!name || !address1 || !address2 || !pincode || !userID) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user by userID
    // const user = await Otp.findById(userID);
    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new address object
    // const newAddress = new Address({ name, address1, address2, pincode,userID });

    const newAddress = await Address.create({name, address1, address2, pincode,userID});
    console.log(newAddress);
    


    // Save the new address to the database
    // await newAddress.save();

    // // Add the new address to the user's addresses array (assuming user schema has an 'addresses' field)
    // user.addresses.push(newAddress._id);
    // await user.save();

    res.status(201).json({
      message: 'Address added successfully',
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Fetch all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({ data: addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Edit an existing address
export const editAddress = async (req, res) => {
  const { userID } = req.params;  // Get userID from the URL parameters
  const updatedData = req.body;   // Get the updated address data from the request body

  try {
    // Find the address by userID and update it
    const updatedAddress = await Address.findOneAndUpdate(
      { userID },               // Find address by userID
      updatedData,              // Data to update
      { new: true }             // Return the updated document
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found for this userID" });
    }

    res.status(200).json({ message: "Address updated successfully", data: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Error updating address", error: error.message });
  }
};


// Update an existing address
// Update an existing address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params; // Extract the address ID from params
    const { name, address1, address2, pincode } = req.body;

    // Validate input
    if (!name || !address1 || !address2 || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and update the address
    const updatedAddress = await Address.findByIdAndUpdate(
      id, // Use the correct _id for the address
      { name, address1, address2, pincode },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address updated successfully', data: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the address
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully', data: deletedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }


};

//get Adress with userID

export const getAddressByUser = async (req, res) => {
  try {
    const { userID } = req.query;

    // Validate that userID is provided
    if (!userID) {
      return res.status(400).json({ message: "UserID is required to fetch address" });
    }

    // Find orders where userID matches
    const userAddress = await Address.find({ userID }); // Use find() to query by userID
    res.status(200).json({data: userAddress});
  } catch (error) {
    res.status(500).json({ message: "Error fetching user address", error });
  }
};
