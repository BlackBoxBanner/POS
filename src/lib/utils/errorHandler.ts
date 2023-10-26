export const customError: ErrorConstruct = ({ id, message }) => {
	return new Error(JSON.stringify({ id, message } as ErrorType));
};

export const errorParser: ErrorParser = (error: Error) => {
	try {
		const message = JSON.parse(error.message) as ErrorType;
		return message;
	} catch (err: unknown) {
		const message = customError({ id: 'Error', message: 'Error mistype' });
		if (err instanceof Error) throw message;
		return { id: 'Error', message: 'Error mistype' } as ErrorType;
	}
};

export const customDebug = (log: string, status: boolean = false) => {
	status && console.debug(log);
};
