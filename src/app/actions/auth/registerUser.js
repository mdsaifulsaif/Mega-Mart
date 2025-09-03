"use server";

import dbconnection from "../../lib/mongodb";

export const registerUser = async (payload) => {
  try {
    const usersCollection = await dbconnection("users");

    // সরাসরি password save হবে (hash ছাড়াই)
    const data = {
      name: payload.name,
      email: payload.email,
      password: payload.password, // raw password
      role: "user",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(data);

    return {
      success: true,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Register Error:", error);
    return {
      success: false,
      message: "Failed to register user",
    };
  }
};
