export default function sitemap() {
  const baseUrl = "https://bemkmunand.com";
  const now = new Date();

  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/tentang/visi-misi", priority: 0.7 },
    { path: "/tentang/tujuan", priority: 0.7 },
    { path: "/tentang/kabinet-rakit-makna", priority: 0.7 },
    { path: "/tentang/program-unggulan", priority: 0.7 },
    { path: "/tentang/kementerian", priority: 0.7 },
    { path: "/aspirasi", priority: 0.9 },
    { path: "/artikel", priority: 0.8 },
    { path: "/event", priority: 0.8 },
    { path: "/informasi", priority: 0.8 },
    { path: "/survey", priority: 0.6 },
    { path: "/gallery", priority: 0.6 },
    { path: "/kontak", priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.path === "/" ? "daily" : "weekly",
    priority: route.priority,
  }));
}