const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_BASE = `${API_BASE_URL.replace(/\/+$/, "")}/api`;

export function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ——— Public ———
export async function getCakes() {
  const res = await fetch(`${API_BASE}/cakes`);
  if (!res.ok) throw new Error("Failed to fetch cakes");
  return res.json();
}

export async function getCakeById(id) {
  const res = await fetch(`${API_BASE}/cakes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch cake");
  return res.json();
}

export async function getCakesByCategory(category) {
  const params = new URLSearchParams({ category });
  const res = await fetch(`${API_BASE}/cakes/by-category?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch cakes by category");
  return res.json();
}

export async function searchCakes(q) {
  const params = new URLSearchParams({ q: q || "" });
  const res = await fetch(`${API_BASE}/cakes/search?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to search cakes");
  return res.json();
}

export async function createOrder(payload) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to create order");
  }
  return res.json();
}

export async function getOrderById(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch order");
  }
  return res.json();
}

// ——— Auth (customer, employee, admin) ———
export async function authLogin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Login failed");
  }
  return res.json();
}

export async function authRegister(email, password, fullName) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullName: fullName || "" }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Registration failed");
  }
  return res.json();
}

export async function authMe() {
  const res = await fetch(`${API_BASE}/auth/me`, { headers: authHeaders() });
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

// ——— Customer profile ———
export async function getUsersMe() {
  const res = await fetch(`${API_BASE}/users/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function patchUsersMe(data) {
  const res = await fetch(`${API_BASE}/users/me`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

// ——— Employee ———
export async function getEmployeesMe() {
  const res = await fetch(`${API_BASE}/employees/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function patchEmployeesMe(data) {
  const res = await fetch(`${API_BASE}/employees/me`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

export async function getEmployeeOrders() {
  const res = await fetch(`${API_BASE}/employees/orders`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function updateOrderStatus(orderId, status, assignToMe) {
  const res = await fetch(`${API_BASE}/employees/orders/${orderId}/status`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status, assignToMe: !!assignToMe }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to update status");
  }
  return res.json();
}

// ——— Admin ———
export async function getAdminCakes() {
  const res = await fetch(`${API_BASE}/admin/cakes`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch cakes");
  return res.json();
}

export async function createAdminCake(data) {
  const res = await fetch(`${API_BASE}/admin/cakes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to create cake");
  }
  return res.json();
}

export async function updateAdminCake(id, data) {
  const res = await fetch(`${API_BASE}/admin/cakes/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to update cake");
  }
  return res.json();
}

export async function deleteAdminCake(id) {
  const res = await fetch(`${API_BASE}/admin/cakes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete cake");
  return res.json();
}

export async function getAdminReportsSales(from, to, groupBy) {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (groupBy) params.set("groupBy", groupBy);
  const res = await fetch(`${API_BASE}/admin/reports/sales?${params}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch report");
  return res.json();
}

export async function getAdminStaff() {
  const res = await fetch(`${API_BASE}/admin/staff`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch staff");
  return res.json();
}

export async function createAdminStaff(data) {
  const res = await fetch(`${API_BASE}/admin/staff`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.message || "Failed to add staff");
  }
  return res.json();
}

export async function deleteAdminStaff(id) {
  const res = await fetch(`${API_BASE}/admin/staff/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove staff");
  return res.json();
}

export async function getAdminStaffPerformance(id) {
  const res = await fetch(`${API_BASE}/admin/staff/${id}/performance`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch performance");
  return res.json();
}
