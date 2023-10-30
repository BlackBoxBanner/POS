type ErrorType = {
	id: string;
	message: string;
};
type ErrorConstruct = (props: ErrorType) => Error;

type ErrorParser = (props: Error) => ErrorType;
