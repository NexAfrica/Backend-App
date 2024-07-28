const signoutController = async (req, res) => {
    try {
      // Clear the cookie
      res.clearCookie('Authorized');
      
      return res.status(200).json({
        ok: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export default signoutController;
  