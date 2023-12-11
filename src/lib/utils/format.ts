export function formatNumber(num: number): string {
	return num >= 1 && num <= 9 ? `0${num}`.slice(-2) : num.toString().slice(-2);
}

export function formatTime(date: string = new Date().toISOString()) {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	};

	return new Date(date).toLocaleTimeString('en-US', options);
}

// create function that call formatDate where input is date: string = new Date().toISOString() and output is string like '11 DEC 2023'
export function formatDate(date: string = new Date().toISOString()) {
	const dateDate = new Date(date)
	const day = dateDate.getDate()
	// get month like DEC, JUL, AUG
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateDate)
	const year = dateDate.getFullYear()

	return `${day} ${month} ${year}`.toUpperCase()
}

export const capitalizeFirstLetter = (str: string) => {
	return str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
};
