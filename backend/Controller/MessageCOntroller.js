


//Get all users except the  loggedin users

export const getUsersForSidebar=async(req,res)=>{
    try {
     const userId=req.user._id
     const filteredUsers=await(User.find({_i})) 
    } catch (error) {
      throw error
    }
}