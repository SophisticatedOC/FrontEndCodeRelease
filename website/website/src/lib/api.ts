const API_URL = "http://localhost:5000/api";

export const getFleet = async () => {
  const res = await fetch(`${API_URL}/fleet`);
  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch fleet");
  }

  return json.data;
};

export const getBusById = async (id: string) => {
  const res = await fetch(`${API_URL}/fleet/${id}`);
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
    `http://localhost:5000/api/fleet/${busId}/components/${componentId}/history`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  const res = await fetch("http://localhost:5000/api/auth/login", {
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