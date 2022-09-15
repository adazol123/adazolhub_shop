import { Dispatch } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { ChangeEvent, SetStateAction } from "react";

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

export interface StepperValue {
  step: number;
  email: string;
  username: string;
  fullname: string;
  password: string;
  confirm_password: string;
}

export interface StepperProps<Z> {
  nextStep: () => void;
  prevStep: () => void;
  setStepper: React.Dispatch<React.SetStateAction<StepperValue>>;
  handleInputChange: (
    input: keyof StepperValue
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  values: Z;
}
