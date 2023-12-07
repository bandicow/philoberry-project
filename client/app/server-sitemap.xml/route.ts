// @ts-ignore
import { getServerSideSitemap } from "next-sitemap";
import { getProducts } from "@/lib/action";

const url = process.env.NEXT_PUBLIC_URL
  ? process.env.NEXT_PUBLIC_URL
  : "http://localhost:8000";

export async function GET() {
  const products = await getProducts();

  const urls = products.map((product) => ({
    loc: `${url}/sale/${product.id}`,
    lastmod: new Date().toISOString(),
  }));

  urls.push({
    loc: `${url}/artist`,
    lastmod: new Date().toISOString(),
  });

  return getServerSideSitemap(urls);
}
