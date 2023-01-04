import { atom } from "jotai";

const loginActionAtom = atom<"login" | "register">("login");

export { loginActionAtom };
