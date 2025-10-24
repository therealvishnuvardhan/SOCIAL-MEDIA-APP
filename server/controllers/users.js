// controllers/users.js

import User from "../models/user.js";


/* Other controllers here: getUser, getUserFriends, etc. */

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE: Add or Remove Friend */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Prevent adding/removing yourself
    if (id === friendId) {
      return res
        .status(400)
        .json({ message: "You cannot add or remove yourself as a friend." });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    // Add or remove friend
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fid) => fid !== friendId);
      friend.friends = friend.friends.filter((fid) => fid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    // Return updated friends list
    const friends = await Promise.all(
      (user.friends || []).map((fid) => User.findById(fid))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// SEARCH USERS
export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "No query provided" });

    // Find users whose name or username matches query
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).select("_id firstName lastName username picturePath");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
