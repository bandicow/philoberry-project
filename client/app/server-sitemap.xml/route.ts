// @ts-ignore
import { getServerSideSitemap } from "next-sitemap";
import { getProducts } from "@/lib/action";

const url = process.env.NEXTAUTH_URL
  ? process.env.NEXTAUTH_URL
  : "http://localhost:3000";

export async function GET() {
  const products = await getProducts();

  const urls = products.map((product) => ({
    loc: `${url}/sale/${product.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(urls);
}
