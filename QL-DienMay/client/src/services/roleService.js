const API_URL = "http://localhost:5000/api/v1/roles";

// Hàm chung xử lý response
const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Có lỗi xảy ra");
  }

  return data;
};

const roleService = {
  getAll: async () => {
    const res = await fetch(API_URL);
    return handleResponse(res);
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return handleResponse(res);
  },

  create: async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    return handleResponse(res);
  },
};

export default roleService;
