import QRCode from 'qrcode';

type UseQr = (props: UseQrProps) => Promise<string>;
export type UseQrProps = {
	url: string;
	type?: 'string';
};
/**
 * Generates a QR code based on the provided URL.
 * @param {Object} options - The options for generating the QR code.
 * @param {string} options.url - The URL to be encoded in the QR code.
 * @param {string} options.type - The type of the generated QR code. Can be 'string' or 'dataURL'.
 * @returns {Promise<string | string>} - A promise that resolves to the generated QR code. If the type is 'string', it resolves to a string representation of the QR code. If the type is 'dataURL', it resolves to a data URL of the QR code image.
 */
export const useQr: UseQr = async ({ url, type }) => {
	return type == 'string' ? QRCode.toString(url) : QRCode.toDataURL(url);
};
