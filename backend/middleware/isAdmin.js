
const isAdmin = (req, res, next) => {
    console.log("req.user.role", req.user.role);

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "forbidden" });
    }                   
        next(); 
}

export default isAdmin;