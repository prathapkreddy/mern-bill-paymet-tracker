import verifyToken from "../config/firebase.auth/firebase.admin.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = await verifyToken(token);
    if (!user) return res.status(403).json({ message: "Invalid token" });

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.uid = decodedToken.uid;

    next();
};
