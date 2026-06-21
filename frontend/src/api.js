const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || ""
  const isJson = contentType.includes("application/json")
  const payload = isJson ? await response.json() : await response.text()

  if (response.ok) {
    return payload
  }

  const detail = payload?.detail
  const message = Array.isArray(detail)
    ? detail.map(item => item.msg || item.message || "Request failed").join(", ")
    : detail || payload?.message || (typeof payload === "string" ? payload : "Request failed")

  const error = new Error(message)
  error.status = response.status
  error.payload = payload
  throw error
}

function request(path, options = {}) {
  return fetch(`${BASE}${path}`, options).then(parseResponse)
}

function authHeaders(token, headers = {}) {
  return token
    ? { ...headers, Authorization: `Bearer ${token}` }
    : headers
}

export const api = {
  register: (data) =>
    request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  login: (data) =>
    request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  getMe: (token) =>
    request("/users/me", {
      headers: authHeaders(token)
    }),

  getDashboard: (token) =>
    request("/users/me/dashboard", {
      headers: authHeaders(token)
    }),

  updateStreak: (token, action) =>
    request("/streaks/me/update", {
      method: "POST",
      headers: authHeaders(token, { "Content-Type": "application/json" }),
      body: JSON.stringify({ action })
    }),

  getCourses: () => request("/courses/"),

  enrollCourse: (token, courseId) =>
    request(`/courses/${courseId}/enroll`, {
      method: "POST",
      headers: authHeaders(token)
    }),

  connectGithub: (token, username) =>
    request(`/integrations/github/connect?username=${encodeURIComponent(username)}`, {
      headers: authHeaders(token)
    }),

  connectLeetcode: (token, username) =>
    request(`/integrations/leetcode/connect?username=${encodeURIComponent(username)}`, {
      headers: authHeaders(token)
    }),

  getGithubStats: (token) =>
    request("/integrations/github/stats", {
      headers: authHeaders(token)
    }),

  getLeetcodeStats: (token) =>
    request("/integrations/leetcode/stats", {
      headers: authHeaders(token)
    }),

  getCourseDetails: (courseId) => request(`/courses/${courseId}`),

  updateProgress: (token, data) =>
    request("/progress/update", {
      method: "POST",
      headers: authHeaders(token, { "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    }),

  getMyProgress: (token) =>
    request("/progress/me", {
      headers: authHeaders(token)
    }),

  getMyProgressForCourse: (token, courseId) =>
  request(`/progress/me/${courseId}`, {
    headers: authHeaders(token)
  }),

getXP: (token) =>
  request("/users/me/xp", {
    headers: authHeaders(token)
  }),
}