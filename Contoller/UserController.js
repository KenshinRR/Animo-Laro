import User from "../Models/Schemas/User.js";
import { getUser ,createUser,getUserUseUsername,updateUserProfile} from "../Models/Server/UserDataLoader.js"

// register/create
export async function registerUser(req, res) {
    try {
        const { username, password } = req.body;
        const newUser = await createUser(username, password);

        if (!newUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        res.json({ message: 'Registered Successfully!', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

// login
export async function loginUser(req, res) {
    try {
        const { username, password, remember_me } = req.body;
       
        const user = await User.findOne({ username });
        const passMatch = await user.comparePassword(password);
        if (!user || !passMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }


        if(remember_me){
            // 30 days
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        else{
            // req.session.cookie.expires = undefined;
            req.session.cookie.maxAge = undefined;
        }

        req.session.user = {
            username:user.username,
            bio:user.bio,
            avatar:user.avatar
        };

        res.json({ message: 'Login successful!', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export async function logoutUser(req, res) {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
}

// get profile by username
export async function getProfile(req, res) {
    try {
        const { username } = req.query;
        const user = await getUserUseUsername(username);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function updateProfile(req, res) {
    try {
        const { username, newUsername, bio, avatar, password } = req.body;

        const updatedUser = await updateUserProfile(
            username,
            newUsername,
            bio,
            avatar,
            password 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }
}

export async function getCurrentUser(req, res){ 
    if(!req.session.user){
        return res.status(401).json({error: "Not logged in."})
    }   

    res.json({user: req.session.user});
}