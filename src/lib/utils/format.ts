export function formatNumber(num: number): string {
	return num >= 1 && num <= 9 ? `0${num}` : num.toString();
}

export function formatTime(date: string = new Date().toISOString()) {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	};

	return new Date(date).toLocaleTimeString('en-US', options);
}
