const API_URL = "http://localhost:5000/api/v1/users";

const userService = {
  getAll: async () => {
    const res = await fetch(API_URL);
      const json = await res.json();
    return json.data || []; 
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

export default userService;
