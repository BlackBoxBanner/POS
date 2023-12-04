export const mockFile = (type: string, size: number): File => {
	const fileName = (Math.random() * 1000).toString().replace('.', '') + type.toLowerCase();
	const file = new File([''], fileName);
	Object.defineProperty(file, 'size', { value: size });
	return file;
};

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
