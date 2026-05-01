const API_BASE_URL = "http://127.0.0.1:8001/api/blog";

export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts/`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function getPostBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/posts/${slug}/`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch post");
  }
  return response.json();
}
