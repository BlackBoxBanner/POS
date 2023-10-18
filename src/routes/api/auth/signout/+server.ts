import type { RequestHandler } from './$types';
import { signOut } from "$lib/auth"

export const POST: RequestHandler = async ({ request, }) => {
  try {
    const user = await signOut()
    return new Response(JSON.stringify(user));
  } catch (err: unknown) {
    if (err instanceof Error) return new Response(err.message, { status: 400 });
    return new Response("Error", { status: 400 });
  }
};