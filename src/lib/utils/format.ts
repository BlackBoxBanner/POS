export function formatNumber(num: number): string {
	return num >= 1 && num <= 9 ? `0${num}`.slice(-2) : num.toString().slice(-2);
}

/**
 * Formats the given date string into a time string in 24-hour format.
 * If no date string is provided, the current date and time will be used.
 * @param date - The date string to format. Defaults to the current date and time.
 * @returns The formatted time string.
 */
export function formatTime(date: string = new Date().toISOString()) {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	};

	return new Date(date).toLocaleTimeString('en-US', options);
}

/**
 * Formats a date string into a specific format.
 * If no date is provided, the current date is used.
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: string = new Date().toISOString()) {
	const dateDate = new Date(date)
	const day = dateDate.getDate()
	// get month like DEC, JUL, AUG
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateDate)
	const year = dateDate.getFullYear()

	return `${day} ${month} ${year}`.toUpperCase()
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param {string} str - The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string) => {
	return str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
};
