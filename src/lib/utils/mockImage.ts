/**
 * Creates a mock File object with the specified type and size.
 * @param type - The file type.
 * @param size - The file size in bytes.
 * @returns The mock File object.
 */
export const mockFile = (type: string, size: number): File => {
	const fileName = (Math.random() * 1000).toString().replace('.', '') + type.toLowerCase();
	const file = new File([''], fileName);
	Object.defineProperty(file, 'size', { value: size });
	return file;
};

/**
 * Creates a mock FileList object based on the provided array of files.
 *
 * @param files - An array of File objects.
 * @returns A FileList object containing the files from the input array.
 */
export const mockFileList = (files: File[]): FileList => {
	const input = document.createElement('input');
	input.setAttribute('type', 'file');
	input.setAttribute('name', 'file-upload');
	input.multiple = true;
	const fileList: FileList = Object.create(input.files);
	for (let i = 0; i < files.length; i++) {
		fileList[i] = files[i];
	}
	Object.defineProperty(fileList, 'length', { value: files.length });
	return fileList;
};
