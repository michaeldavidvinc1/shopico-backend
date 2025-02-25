import { User } from "@prisma/client";

export type AuthResponse = {
  id?: string;
  name: string;
  email: string;
  role: string;
  token?: string;
  exp?: number;
};

export function toAuthResponse(user: User): AuthResponse {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
