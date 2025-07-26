// Utility to handle asset paths for both local and GitHub Pages deployment
export function getAssetPath(path: string): string {
  // In production (GitHub Pages), we need the repository name prefix
  // In development (localhost), we don't need any prefix
  const prefix = process.env.NODE_ENV === 'production' ? '/gauntlet-portfolio' : '';
  return `${prefix}${path}`;
}