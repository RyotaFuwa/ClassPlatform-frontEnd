import {firestore} from "./firebase.utils";

export const getAllClasses = async () => {
  const query = firestore.collection('classes');
  const querySnapshot = await query.get();
  return querySnapshot;
}

export const getClassByName = async name => {
  const query = firestore.collection('classes');
  const querySnapshot = await query.where('name', '==', name).limit(1).get();
  return querySnapshot.docs[0];
}

export const createClass = async newClass => {
  const query = firestore.collection('classes');
  const documentRef = await query.add(newClass);
  return documentRef;
}

export const updateClass = async (classId, updatingFields) => {
  const documentRef = firestore.collection('classes').doc(classId);
  const writeResult = await documentRef.set(updatingFields, {merge: true});
  return writeResult;
}

export const createDoc = async (classId, newDoc) => {
  const query = firestore.collection('classes').doc(classId).collection('docs');
  const documentRef =  query.add(newDoc);
  return documentRef;
}
