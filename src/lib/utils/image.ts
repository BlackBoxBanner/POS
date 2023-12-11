export function getImage(filesList: FileList) {
	return filesList && filesList.length != 0 ? filesList[0] : null;
}

/**
 * Converts an image URL to a File object.
 * @param url The URL of the image.
 * @param fileName The desired name for the resulting File object.
 * @returns A Promise that resolves to a File object representing the image.
 */
export async function toFile(url: string, fileName: string) {
	const blob = await (await fetch(url)).blob();
	return new File([blob], fileName, { type: blob.type });
}

/**
 * Converts a File object to a base64 string.
 * @param file - The File object to convert.
 * @returns A Promise that resolves with the base64 string representation of the file.
 */
export function toBase64(file: File) {
	return new Promise<string>(function (resolve, reject) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			resolve(reader.result as string);
		};
		reader.onerror = function (error) {
			reject(error);
		};
	});
}
