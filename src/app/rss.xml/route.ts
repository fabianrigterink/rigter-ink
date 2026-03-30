import { generateRssFeed } from "@/lib/rss";

export function GET() {
  const feed = generateRssFeed();
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
