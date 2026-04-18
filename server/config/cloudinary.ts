import { v2 as cloudinary } from 'cloudinary';

export const initCloudinary = (): void => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) reject(error ?? new Error('Upload failed'));
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export const destroyFromCloudinary = async (url: string): Promise<void> => {
  const publicId = extractPublicId(url);
  if (publicId) await cloudinary.uploader.destroy(publicId);
};

const extractPublicId = (url: string): string => {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return '';
    const withoutVersion = parts[1].replace(/^v\d+\//, '');
    return withoutVersion.replace(/\.[^.]+$/, '');
  } catch {
    return '';
  }
};
