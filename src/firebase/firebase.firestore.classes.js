import {firestore} from "./firebase.utils";

export const getClasses = async () => {
  const query = firestore.collection('classes');
  const querySnapshot = await query.get();
  return querySnapshot;
}

export const getClassByName = async name => {
  console.log(name);
  const query = firestore.collection('classes')
  const querySnapshot = await query.where('name', '==', name).get();
  return querySnapshot.docs[0];
}

export const createClass = async newClass => {
  let documentRef = firestore.collection('classes');
  let documentReference = await documentRef.add(newClass);
  return documentReference;
}

export const updateClass = async (classId, updatingFields) => {
  let documentRef = firestore.collection('classes').doc(classId);
  let writeResult = await documentRef.set(updatingFields, {merge: true});
  return writeResult;
}
