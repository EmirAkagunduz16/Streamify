import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res){
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    console.log("Generating token for user:", req.user.fullName, req.user._id);
    
    const token = generateStreamToken(req.user._id);
    
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}