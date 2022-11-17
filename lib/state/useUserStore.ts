import create from "zustand";
import produce from "immer";
import { ToastContent } from "../types";

interface UserStoreState {
  isAutoSwitch: boolean;
  setAutoSwitch: (isAutoSwitch: boolean) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toastContent: ToastContent;
  setToastContent: (toastContent: ToastContent) => void;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  isAutoSwitch: false,
  setAutoSwitch: (isAutoSwitch) => set(() => ({ isAutoSwitch: isAutoSwitch })),
  isOpen: false,
  setOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
  toastContent: {
    title: "",
    description: "",
    txid: "",
    type: "success",
  },
  setToastContent: (toastContent: ToastContent) =>
    set(() => ({ toastContent: toastContent })),
}));