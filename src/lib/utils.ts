// Get full asset path (simplified for Vercel)
export function getAssetPath(path: string): string {
  // If path already starts with http/https, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Ensure path starts with /
  return path.startsWith("/") ? path : `/${path}`;
}

// Generate UI Avatars URL as fallback
export function getAvatarFallback(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128&bold=true`;
}
