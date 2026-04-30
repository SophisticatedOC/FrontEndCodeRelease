const API_URL = "http://localhost:5000/api";

// Get the saved login token from localStorage
const getToken = () => localStorage.getItem("token");

// Shared headers for protected API requests
const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const getFleet = async () => {
  const res = await fetch(`${API_URL}/fleet`, {
    headers: getAuthHeaders(),
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch fleet");
  }
console.log("Token being sent:", getToken());
  return json.data;
};

export const getBusById = async (id: string) => {
  const res = await fetch(`${API_URL}/fleet/${id}`, {
    headers: getAuthHeaders(),
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch bus");
  }

  return json.data;
};

export const addMaintenanceEntry = async (
  busId: string,
  componentId: string,
  entry: any
) => {
  const res = await fetch(
    `${API_URL}/fleet/${busId}/components/${componentId}/history`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(entry),
    }
  );

  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to add maintenance entry");
  }

  return json.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error || "Login failed");
  }

  return json.data;
};