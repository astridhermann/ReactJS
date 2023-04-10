const apiUrl = import.meta.env.VITE_API_URL;
export class ApiError extends Error {}

async function handleResponse(res) {
  if (!res.ok) {
    const errorMessage = await res.json();
    throw new ApiError(errorMessage);
  }

  return res.json();
}

const headers = {
  "Content-type": "application/json",
};

export function configureApi(entity) {
  async function get(search = {}, options = {}) {
    let restOfUrl = "";
    if (Object.keys(search).length > 0) {
      restOfUrl = "?";
      for (const key in search) {
        restOfUrl += `${key}=|${search[key]}`;
      }
    }

    return fetch(`${apiUrl}/${entity}`, options).then(handleResponse); //${restOfUrl}
  }

  async function update(id, body, options = {}) {
    return fetch(`${apiUrl}/${entity}/${id}`, {
      headers,
      body: JSON.stringify(body),
      method: "PATCH",
      ...options,
    }).then(handleResponse);
  }

  async function add(body, options = {}) {
    return fetch(`${apiUrl}/${entity}`, {
      headers,
      body: JSON.stringify(body),
      method: "POST",
      ...options,
    }).then(handleResponse);
  }

  async function remove(id, options = {}) {
    return fetch(`${apiUrl}/${entity}/${id}`, {
      method: "DELETE",
      ...options,
    }).then(handleResponse);
  }

  return {
    get,
    update,
    add,
    remove,
  };
}
