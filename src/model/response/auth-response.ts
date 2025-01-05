import { User } from "@prisma/client";

export type AuthResponse = {
  name: string;
  email: string;
  role: string;
  token?: string;
};

export function toAuthResponse(user: User): AuthResponse {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
