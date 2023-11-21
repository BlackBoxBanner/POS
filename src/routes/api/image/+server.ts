import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';
import { postImageUrl } from '$lib/handler/image';

const exampleFunc = async () => {
  return 'example function toggle';
};

export const POST: RequestHandler = async ({ request }) => {
  const { image } = (await request.json()) as { image: string }

  const { data, error } = await awesome.async(() => postImageUrl("name", image));
  if (error) return Response.json(error.message, { status: 400 });
  return Response.json(data);
};