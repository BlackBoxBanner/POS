import { supabase } from '$lib/supabase';
import { customError } from '@dookdiks/error';
import { awesome } from '@dookdiks/utils';

const getFoodBucket = () => {
  return supabase.storage.from("food")
}

export type GetImageUrlHandle = (path: string) => Promise<string>

export const getImageUrlHandler: GetImageUrlHandle = async (path) => {
  const bucket = getFoodBucket()
  const imageUrl = bucket.getPublicUrl(path)
  const responseDate = await fetch(imageUrl.data.publicUrl)

  if (!responseDate.ok) throw customError({ id: "image", message: "No image found" })
  return responseDate.url
}

export const uploadImageHandler = async () => {
  const bucket = getFoodBucket()
  // bucket.upload()
}

export const getImageUrl = async (path: string) => {
  return awesome.async(() => getImageUrlHandler(path))
}