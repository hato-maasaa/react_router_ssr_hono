import { createCookie } from "react-router";

export const SessionCookie = (secrets: string, secure: boolean) =>
  createCookie("session", {
    httpOnly: true,
    secrets: secrets.split(","),
    maxAge: 6000, 
    path: "/",
    sameSite: "lax",
    secure,
  });