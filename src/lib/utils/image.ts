export function getImage(filesList: FileList) {
  return filesList && filesList.length != 0 ? filesList[0] : null;
}