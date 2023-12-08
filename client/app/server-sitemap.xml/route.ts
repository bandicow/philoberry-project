// @ts-ignore
import { getServerSideSitemap } from "next-sitemap";
import { getProducts } from "@/lib/action";

const URL = process.env.NEXT_PUBLIC_URL
  ? process.env.NEXT_PUBLIC_URL
  : "http://localhost:8000";

export async function GET() {
  let products;

  try {
    products = await getProducts();
  } catch (error) {
    products = [
      {
        id: 1,
        name: "test",
        price: 100,
        description: "test",
        image: "test",
        category: "test",
        artist: "test",
        artistId: 1,
        createdAt: "test",
        updatedAt: "test",
      },
    ];
  }

  const urls = products.map((product) => ({
    loc: `${URL}/sale/${product.id}`,
    lastmod: new Date().toISOString(),
  }));

  urls.push({
    loc: `${URL}/artist`,
    lastmod: new Date().toISOString(),
  });

  return getServerSideSitemap(urls);
}
