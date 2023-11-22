import type { RequestHandler } from './$types';
import { getImageUrl, postImageUrl } from '$lib/handler/image';
import { toFile } from '$lib/utils/image';

export const POST: RequestHandler = async ({ request }) => {
  const { image, name } = (await request.json()) as { image: string, name: string }
  const file = await toFile(image, name)

  const { data: path, error: pathError } = await postImageUrl(file.name, file)

  if (pathError) return Response.json(pathError.message, { status: 400 });

  const { data: imageUrl, error: imageError } = await getImageUrl(path)
  if (imageError) return Response.json(imageError.message, { status: 400 });

  return Response.json(imageUrl);
};