import User from "../Models/Schemas/User.js";
import { getUser ,createUser,getUserUseUsername,updateUserProfile} from "../Models/Server/UserDataLoader.js"

// register/create
export async function registerUser(req, res) {
    return res.status(400).json({ errors: { test: "this is running" } });
    try {
        const { username, password } = req.body;
        
        const errors = {};
        
        // back-end check
        if (!username || username.length < 3 || username.length > 15) {
            errors.username = 'Username must be 3–15 characters.';
        }

        if (!password) {
            errors.password = 'Password must at least contain 8 characters.';
        } 
        else {
            const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
            if (!strongPasswordRegex.test(password)) {
                errors.password = 'Password must include an uppercase letter, a number, and a special character.';
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const newUser = await createUser(username, password);

        if (!newUser) {
            return res.status(400).json({ errors: {username: 'Username already exists'}});
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
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passMatch = await user.comparePassword(password);
        if (!passMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if(remember_me){
            // 30 days
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        else{
            req.session.cookie.expires = undefined;
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
        res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
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