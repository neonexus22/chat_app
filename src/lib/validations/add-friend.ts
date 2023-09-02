import { z } from "zod";

export const addFriendValidator = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
});
