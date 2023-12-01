export function getImage(filesList: FileList) {
	return filesList && filesList.length != 0 ? filesList[0] : null;
}

export async function toFile(url: string, fileName: string) {
	const blob = await (await fetch(url)).blob();
	return new File([blob], fileName, { type: blob.type });
}

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
