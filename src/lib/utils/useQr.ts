import QRCode from 'qrcode';

type UseQr = (props: UseQrProps) => Promise<string>;
export type UseQrProps = {
	url: string;
	type?: 'string';
};
export const useQr: UseQr = async ({ url, type }) => {
	return type == 'string' ? QRCode.toString(url) : QRCode.toDataURL(url);
};
