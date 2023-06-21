import { withIronSession } from "next-iron-session";

export default withIronSession(
  async () => {
    // Your session handling logic here
  },
  {
    password: "your-password", // Replace with your own secure password
    cookieName: "session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
