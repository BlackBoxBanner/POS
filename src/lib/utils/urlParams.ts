/**
 * Adds query parameters to a URL.
 * 
 * @param url - The URL to add query parameters to.
 * @param params - An object containing key-value pairs of query parameters.
 * @returns The modified URL with the added query parameters.
 */
export function addQueryParameters(url: string, params: { [key: string]: string }): string {
	const urlObject = new URL(url);

	for (const [key, value] of Object.entries(params)) {
		urlObject.searchParams.set(key, value);
	}

	return urlObject.toString();
}
