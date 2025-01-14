export const ExtractPublicId = (imageUrl: string) => {
  const urlParts = new URL(imageUrl);
  const pathname = urlParts.pathname; // Contoh: /image/upload/v1672305623/folder-name/example-image.jpg
  const publicId = pathname
    .split("/")
    .slice(5)
    .join("/")
    .replace(/\.[^/.]+$/, ""); // Menghapus ekstensi file
  return publicId;
};
