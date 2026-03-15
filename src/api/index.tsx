const API_KEY = '6phxhEProtdpaYxyIo9zbXezEdUd11ocjvjFRu0rMkdypeMmpWNhnFji';
const BASE_URL = 'https://api.pexels.com/v1';
const headers = {
  Authorization: API_KEY,
};

export const fetchTrendingWallpapers = async (page: number) => {
  try {
    const res = await fetch(`${BASE_URL}/curated?page=${page}&per_page=20`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchCategoryWallpapers = async (
  query: string,
  pageParam: number,
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search?query=${query}&page=${pageParam}&per_page=20`,
      { headers },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
