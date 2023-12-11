import type { ErrorType } from '@dookdiks/error';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export const axiosInstant = axios.create({});

/**
 * Sends a custom Axios request and returns the response data or error.
 * @template T - The type of the response data.
 * @param {string} url - The URL to send the request to.
 * @param {AxiosRequestConfig<any>} [config] - The Axios request configuration.
 * @returns {Promise<{ data: T | null, error: ErrorType | null }>} The response data or error.
 */
export const customAxios = async <T = Record<string, unknown>>(
	url: string,
	config?: AxiosRequestConfig<any>
) => {
	try {
		const data = (await axiosInstant(url, config)) as T;
		return { data, error: null };
	} catch (err: unknown) {
		const error = (err as AxiosError).response?.data as ErrorType;

		return { data: null, error };
	}
};
