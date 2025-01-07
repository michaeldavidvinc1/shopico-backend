import { User } from "@prisma/client";

const createTokenUser = (user: User) => {
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
};

export { createTokenUser };
