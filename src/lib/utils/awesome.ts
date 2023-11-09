import { customError } from './errorHandler';

export async function awesome<T>(func: () => Promise<T>, error?: string, id: string = 'internal') {
	try {
		const data = await func();
		return { data, error: undefined };
	} catch (err) {
		if (err instanceof Error) {
			return {
				data: null,
				error: customError({ message: error ? error : err.message, id })
			};
		}
		return { data: null, error: customError({ message: 'Internal error', id }) };
	}
}
