export const getFormattedFile = (out: string) => {
	const fileLines = out.split(/\n/);
	if (fileLines.length > 1) {
		fileLines.pop(); //Файл разбит на строки, последняя пустая убрана
	}
	return fileLines;
}