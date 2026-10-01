import { supabase } from "./supabase";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Product {
  id: string;
  title: string;
  price: string; // "Rp 115.000" (sudah terformat)
  image_url: string;
  affiliate_url: string;
  created_at: string;
  categories_id: string;
  category?: Category | null;
}

/** Ambil semua kategori */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .order("name", { ascending: true });

  if (error) {
    console.error("[categories]", error.message);
    return [];
  }
  return (data ?? []) as Category[];
}

/** Ambil semua produk + join kategori */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, title, price, image_url, affiliate_url, created_at, categories_id,
      category:categories ( id, name, slug, description )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[products]", error.message);
    return [];
  }
  return (data ?? []) as unknown as Product[];
}
