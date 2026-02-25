const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path.startsWith("/")) {
    return `${basePath}/${path}`.replace(/\/\/+/, "/");
  }

  return `${basePath}${path}` || path;
}
