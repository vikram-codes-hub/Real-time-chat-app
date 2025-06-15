import { generatetoken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/CLoudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, msg: "Missing details" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, msg: "Account already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedpassword,
      bio,
    });

    const token = generatetoken(newUser._id);
    res.json({
      success: true,
      UserData: newUser,
      token,
      mssg: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, msg: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "Account does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, msg: "Invalid credentials" });
    }
    const token = generatetoken(user._id);
    res.json({
      success: true,
      UserData: user,
      token,
      msg: "Login successful",
    });
  } catch (error) {
        console.log(error.message);
    return res.json({ success: false, msg: error.message });
  }
};


//Controller to check whether user is authenticated

export const checkAuth=(req,res)=>{
  res.json({success:true,user:req.user})
}



//Contoller to update user profile details


export const updateProfile=async(req,res)=>{
  try {
   const {profilePic,bio,fullName}=req.body
   
   const userId=req.user._id
   let updatedUser

   if(!profilePic){//if only bio and full Name need to be changed not the profile
    updatedUser=await User.findByIdAndUpdate(userId,{bio,fullName},{new:true})
   }else{//when profile also need to be changed
    const upload=await cloudinary.uploader.upload(profilePic)
    updatedUser=await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true})
   }
   res.json({success:true,user:updatedUser})
  } catch (error) {
   console.log(error)
    res.json({success:false,mssg:error.message})
  }
}

