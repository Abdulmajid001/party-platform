import { create } from "zustand";
import api from "./api";
import { avatar } from "@/data/images";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const SESSION_KEY = "rallyhall_mock_user";

// ---------- mock helpers (remove once the real backend is connected) ----------
function buildMockUser({ name, email, state, ward, phone } = {}) {
  const lower = (email || "").toLowerCase();
  const role = lower.includes("admin") ? "admin" : lower.includes("leader") ? "leader" : "member";
  return {
    id: "me",
    name: name || "Tiwa Balogun",
    email,
    phone: phone || "0803 555 0142",
    role,
    verified: role !== "member",
    avatar: avatar(5),
    state: state || "Lagos",
    ward: ward || "Ikeja Ward 3",
    partyRole: role === "member" ? "Ward member" : role === "leader" ? "Ward coordinator" : "Platform admin",
    bio: "Community organiser and ward member. I care about local roads, schools and getting every voice into the room.",
    memberSince: "2024",
    groups: 3,
    connections: 12,
  };
}

function saveSession(user) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // storage unavailable, session just won't survive a refresh
  }
}

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

// ---------- store ----------
export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: true,

  // Call once on app load to restore the session
  fetchUser: async () => {
    if (USE_MOCK) {
      set({ user: readSession(), isLoading: false });
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (credentials) => {
    if (USE_MOCK) {
      const user = buildMockUser({ email: credentials.email });
      saveSession(user);
      set({ user });
      return;
    }
    const { data } = await api.post("/auth/login", credentials);
    set({ user: data.user });
  },

  register: async (values) => {
    if (USE_MOCK) {
      const user = buildMockUser(values);
      saveSession(user);
      set({ user });
      return;
    }
    const { data } = await api.post("/auth/register", values);
    set({ user: data.user });
  },

  updateProfile: async (changes) => {
    if (USE_MOCK) {
      const user = { ...get().user, ...changes };
      saveSession(user);
      set({ user });
      return;
    }
    const { data } = await api.patch("/users/me", changes);
    set({ user: data });
  },

  logout: async () => {
    if (!USE_MOCK) {
      try {
        await api.post("/auth/logout");
      } catch {
        // clear the local session even if the request fails
      }
    }
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    set({ user: null });
  },
}));
