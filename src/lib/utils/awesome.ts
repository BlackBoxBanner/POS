import { errorParser } from "./errorHandler";

export async function awesome<T>(
  func: () => Promise<T>,
  error?: string,
  id: string = "internal"
) {
  try {
    const data = await func();
    return { data, error: undefined }
  } catch (err) {
    console.log(err);
    
    if (err instanceof Error) {
      return {
        data: null,
        error: errorParser(err),
      }
    }
    return {
      data: null, error: {
        id: "internal",
        message: "Internal error"
      } as ErrorType
    }
  }
}