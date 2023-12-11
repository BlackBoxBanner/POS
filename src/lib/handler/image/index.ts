import { supabaseAdmin } from '$lib/supabase';
import { customError } from '@dookdiks/error';
import { awesome } from '@dookdiks/utils';

const getFoodBucket = () => {
	return supabaseAdmin.storage.from('food');
};

export type GetImageUrlHandle = (path: string) => Promise<string>;

/**
 * Retrieves the public URL of an image from a specified path.
 * @param path - The path of the image.
 * @returns The public URL of the image.
 * @throws {CustomError} If no image is found.
 */
export const getImageUrlHandler: GetImageUrlHandle = async (path) => {
	const bucket = getFoodBucket();
	const imageUrl = bucket.getPublicUrl(path);
	const responseDate = await fetch(imageUrl.data.publicUrl);

	if (!responseDate.ok) throw customError({ id: 'image', message: 'No image found' });
	return responseDate.url;
};

export type UploadImageHandler = (name: string, file: File) => Promise<string>;

/**
 * Uploads an image to the specified bucket.
 * @param name - The name of the image.
 * @param file - The image file to upload.
 * @returns The path of the uploaded image.
 * @throws {CustomError} If there is an error during the upload process.
 */
export const uploadImageHandler = async (name: string, file: File) => {
	const bucket = getFoodBucket();
	const { data, error } = await bucket.upload(name, file);

	if (error) throw customError({ id: 'image', message: error.message });
	return data.path;
};

/**
 * Retrieves the URL of an image.
 * @param path - The path of the image.
 * @returns A promise that resolves to the URL of the image.
 */
export const getImageUrl = async (path: string) => {
	return awesome.async(() => getImageUrlHandler(path));
};

/**
 * Uploads an image with the specified name and file.
 * @param name - The name of the image.
 * @param file - The file to be uploaded.
 * @returns A Promise that resolves to the result of the upload operation.
 */
export const postImageUrl = async (name: string, file: File) => {
	return awesome.async(() => uploadImageHandler(name, file));
};
