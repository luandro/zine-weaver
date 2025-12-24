const baseUrl = import.meta.env.BASE_URL ?? "/";
const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

const normalizePath = (path: string) => path.replace(/^\//, "");

export const publicAssetUrl = (path: string) => {
  return `${normalizedBaseUrl}${normalizePath(path)}`;
};

export const getFallbackImageUrl = (size?: number) => {
  if (size) {
    return publicAssetUrl(`cube-${size}.png`);
  }

  return publicAssetUrl("cube.svg");
};
