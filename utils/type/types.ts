import type { User } from "firebase/auth";

export enum AsyncStatus {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export type UserType = Pick<
  User,
  "displayName" | "email" | "emailVerified" | "phoneNumber" | "photoURL" | "uid"
>;

export interface UserProps {
  user: UserType | null;
  status: keyof typeof AsyncStatus;
  error: string | undefined;
}
