import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";

const Profile = () => {
  const { authuser, updateprofile } = useContext(Authcontext);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authuser.fullName || "");
  const [bio, setBio] = useState(authuser.bio || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setSelectedImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!selectedImg) {
        await updateprofile({ fullName: name, bio });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
          const base64img = reader.result;
          await updateprofile({ profilePic: base64img, fullName: name, bio });
        };
      }
      navigate('/');
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Preview Section */}
        <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 flex flex-col items-center justify-center md:w-1/2">
          <div className="relative mb-6 group">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
              {selectedImg ? (
                <img 
                  src={URL.createObjectURL(selectedImg)} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={authuser?.profilePic || assets.avatar_icon} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
              <label htmlFor="avatar" className="cursor-pointer p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-1">{name || "Your Name"}</h2>
          <p className="text-gray-300 text-center max-w-xs">{bio || "Write something about yourself"}</p>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10 flex flex-col md:w-1/2">
          <h1 className="text-2xl font-bold text-white mb-6">Profile Details</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="avatar" className="hidden">
                Profile Image
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                id="avatar"
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
              <div className="flex items-center gap-4 mb-2">
                <span className="text-gray-300 text-sm font-medium">Profile Image</span>
                <label htmlFor="avatar" className="text-indigo-400 text-sm cursor-pointer hover:text-indigo-300 transition">
                  {selectedImg ? "Change image" : "Upload image"}
                </label>
              </div>
              {selectedImg && (
                <p className="text-xs text-gray-400 mb-4">Selected: {selectedImg.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Enter your name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="bio" className="text-sm font-medium text-gray-300">
                Bio
              </label>
              <textarea
                id="bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                rows="4"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;