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

export type UploadImageHandler = (name: string, file: File) => Promise<string>

export const uploadImageHandler = async (name: string, file: File | string) => {
  const bucket = getFoodBucket()
  const { data, error } = await bucket.upload(name, file)
  if (error) throw customError({ id: "image", message: error.message })
  return data.path
}

export const getImageUrl = async (path: string) => {
  return awesome.async(() => getImageUrlHandler(path))
}

export const postImageUrl = async (name: string, file: File | string) => {
  return awesome.async(() => uploadImageHandler(name, file))
}