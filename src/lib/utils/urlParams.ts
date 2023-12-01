export function addQueryParameters(url: string, params: { [key: string]: string }): string {
	const urlObject = new URL(url);

	for (const [key, value] of Object.entries(params)) {
		urlObject.searchParams.set(key, value);
	}

	return urlObject.toString();
}
