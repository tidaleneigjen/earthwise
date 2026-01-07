import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const getBackendOrigin = () => {
  try {
    const url = new URL(API_BASE_URL);
    return url.origin;
  } catch (e) {
    return "";
  }
};

export const toAbsoluteMediaUrl = (maybeRelativeUrl) => {
  if (!maybeRelativeUrl) return "";
  if (/^https?:\/\//i.test(maybeRelativeUrl)) return maybeRelativeUrl;
  const origin = getBackendOrigin();
  if (!origin) return maybeRelativeUrl;
  return `${origin}${maybeRelativeUrl}`;
};

export const listBlogPosts = async () => {
  const res = await axios.get(`${API_BASE_URL}/content/`, {
    params: { type: "blog", published: "true" },
  });
  return res.data;
};

export const getBlogPost = async (slug) => {
  const res = await axios.get(`${API_BASE_URL}/content/${slug}/`);
  return res.data;
};

export const listArticles = async () => {
  const res = await axios.get(`${API_BASE_URL}/content/`, {
    params: { type: "article", published: "true" },
  });
  return res.data;
};

export const getArticle = async (slug) => {
  const res = await axios.get(`${API_BASE_URL}/content/${slug}/`);
  return res.data;
};

export const listBooks = async () => {
  const res = await axios.get(`${API_BASE_URL}/books/`);
  return res.data;
};

export const listLinks = async () => {
  const res = await axios.get(`${API_BASE_URL}/links/`);
  return res.data;
};
