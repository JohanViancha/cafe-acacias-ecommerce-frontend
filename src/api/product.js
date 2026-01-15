import { ENV } from "@/utils";

export class Product {
  async getLastPublished() {
    try {
      const sort = "sort=publishedAt:desc";
      const pagination = "pagination[limit]=3";
      const populate = "populate=*";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${sort}&${pagination}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getLatestPublished({ limit = 9, platformId = null }) {
    try {
      const filterPlatform =
        platformId && `filters[platform][id][$eq]=${platformId}`;
      const paginationLimit = `pagination[limit]=${limit}`;
      const sort = `sort[0]=publishedAt:desc`;
      const populate = `populate=*`;
      const urlParams = `${sort}&${paginationLimit}&${filterPlatform}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategorySlug(slug, page) {
    try {
      const filters = `filters[category][slug][$eq]=${slug}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
      const populate = "populate=*";
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchProducts(text) {
    try {
      const filters = `filters[title][$containsi]=${text}`;
      const populate = "populate=*";
      const urlParams = `${filters}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populate = `populate[0]=wallpaper&populate[1]=cover&populate&populate[3]=category&populate[4]=category.icon`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${filters}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const populate = `populate[0]=cover&populate[1]=category`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}/${id}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}