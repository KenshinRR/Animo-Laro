import { getUser ,createUser,getUserUseUsername} from "../Models/Server/UserDataLoader.js"


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
        const { username, password } = req.body;
        const user = await getUser(username, password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful!', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
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