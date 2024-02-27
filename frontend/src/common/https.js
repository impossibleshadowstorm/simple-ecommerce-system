import axios from "axios";

export async function fetchBooks(data) {
  try {
    const queryArray = Object.keys(data).reduce((prev, item) => {
      const value = data[item];
      if (value) {
        prev.push(`${item}=${value}`);
      }
      return prev;
    }, []);
    const response = await axios.get(`/api/books?${queryArray.join("&")}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return { error, content: [], total: 0 };
  }
}

export async function fetchBookTypes() {
  try {
    const response = await axios.get(`/api/books/types`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: [] };
  }
}

export async function fetchBookDetailsById(id) {
  try {
    const response = await axios.get(`/api/books/${id}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: {} };
  }
}

export async function fetchBookRatingsById(id) {
  try {
    const response = await axios.get(`/api/books/${id}/ratings`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: { content: [], total: 0 } };
  }
}

export async function updateBookDetails(id, params) {
  try {
    const response = await axios.put(`/api/books/${id}`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function addRatingByBookID(bookID, params) {
  try {
    const response = await axios.post(`/api/books/${bookID}/ratings`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function deleteRating(bookID, userID) {
  try {
    const response = await axios.delete(
      `/api/books/${bookID}/ratings?userId=${userID}`
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function buyBook(bookID, params) {
  try {
    const response = await axios.post(
      `/api/books/${bookID}/buy?userId=${params.userID}&quality=${params.quality}`
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
