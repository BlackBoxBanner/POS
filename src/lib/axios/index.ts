import type { ErrorType } from '@dookdiks/error';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export const axiosInstant = axios.create({});

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
