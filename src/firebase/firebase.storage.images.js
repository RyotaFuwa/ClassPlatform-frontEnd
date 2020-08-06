import { storage } from './firebase.utils';

export const imageRef = storage.ref().child('images');

export const uploadImageAt = async (locationName, fileObj) => {
  return imageRef.child(locationName).put(fileObj)
}

export const deleteImgAt = async locationName => {
  return imageRef.child(locationName).delete();
}

export const getImageAt = async locationName => {
  const url = await imageRef.child(locationName).getDownloadURL();
  return url;
}
