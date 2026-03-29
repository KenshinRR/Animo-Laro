export function requireAuth(req, res, next) {
    if (!req.session.user) {
        console.log("No session user found!");
        return res.status(401).json({ error: "Unauthorized" });
    }

    // const token = req.cookies.token;
    // if (!token)
    // {
    //     console.log("No Token found!");
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (err) {
    //     return res.status(401).json({ error: "Invalid token" });
    // }

    next();
}