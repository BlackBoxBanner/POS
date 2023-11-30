export function addParamsToURL(params: Record<string, string>) {
	const arrParams = Object.entries(params);

	let currentUrl = window.location.href;

	arrParams.forEach((params) => {
		currentUrl = addOrUpdateUrlParameter(currentUrl, params[0], params[1]);
	});

	window.location.href = currentUrl;
}

function addOrUpdateUrlParameter(url: string, key: string, value: string) {
	const urlObject = new URL(url);
	urlObject.searchParams.set(key, value);
	return urlObject.toString();
}
