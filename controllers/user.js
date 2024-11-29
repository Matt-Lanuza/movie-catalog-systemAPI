const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");


// Register a User
module.exports.registerUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password, mobileNo } = req.body;

		if (!email || !email.includes("@")) {
            return res.status(400).send({ error: "Invalid email address" });
        }

        if (!mobileNo || mobileNo.length !== 11) {
            return res.status(400).send({ error: "Mobile number must be 11 digits" });
        }

        if (!password || password.length < 8) {
            return res.status(400).send({ error: "Password must be at least 8 characters long" });
        }


        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNo
        });

        await newUser.save();

        res.status(201).send({ message: 'Registered successfully' });
	} catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }


}


// Login a User
module.exports.loginUser = async (req, res) => {
	try{
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if(!user){
			return res.status(400).send({ error: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compareSync(password, user.password);
		if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        res.status(200).send({ access: auth.createAccessToken(user) });
       

	} catch (error) {
		console.error(error);
        res.status(500).send({ message: 'Server error' });
	}
}

// Get User's details
module.exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id, { password: 0 });

        if (user) {
            return res.status(200).send({
                user: {
                    id: user._id,
                    email: user.email,
                    __v: user.__v
                }
            });
        } else {
            return res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send({details: error});
    }
};