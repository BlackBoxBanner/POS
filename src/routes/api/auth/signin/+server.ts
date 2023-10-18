import type { RequestHandler } from './$types';
import { signIn, type SignInProps } from "$lib/auth"

export const POST: RequestHandler = async ({ request, }) => {
  const body = (await request.json()) as SignInProps

  try {
    const user = await signIn(body)
    return new Response(JSON.stringify(user));
  } catch (err: unknown) {
    if (err instanceof Error) return new Response(err.message, { status: 400 });
    return new Response("Error", { status: 400 });
  }
};