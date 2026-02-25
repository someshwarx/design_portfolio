import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  "imageUrl": mainImage.asset->url,
  "dimensions": mainImage.asset->metadata.dimensions,
  mainImage,
  hexColor,
  size,
  publishedAt
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  category,
  mainImage,
  hexColor,
  description,
  publishedAt
}`);
