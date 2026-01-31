// Get base path for assets (handles GitHub Pages deployment)
export function getBasePath(): string {
  return process.env.NODE_ENV === "production" ? "/website-kelas" : "";
}

// Get full asset path with basePath
export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  // If path already starts with http/https, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

// Generate UI Avatars URL as fallback
export function getAvatarFallback(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128&bold=true`;
}
