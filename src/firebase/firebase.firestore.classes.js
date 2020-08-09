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


//Delta: JSON-like object which holds document data (Delta from Quill like data).

export const getCleanDoc = async cleanDocId => {
  const documentRef = firestore.collection('cleanDoc').doc(cleanDocId);
  const docSnapshot = await documentRef.get();
  return docSnapshot;
}

export const createCleanDoc = async () => {
  const query = firestore.collection('cleanDoc');
  const initialCleanDoc = {
    time: Date.now(),
    blocks: [
      {
        type: 'header',
        text: '',
        level: 4,
      }
    ]
  }
  const documentRef =  query.add(initialCleanDoc);
  return documentRef;
}

export const updateCleanDoc = async (cleanDocId, updatingFields) => {
  const documentRef = firestore.collection('cleanDoc').doc(cleanDocId);
  const writeResult = await documentRef.set(updatingFields, {merge: true});
  return writeResult;
}

export const deleteCleanDoc = async cleanDocId => {
  const documentRef = firestore.collection('cleanDoc').doc(cleanDocId);
  const writeResult = await documentRef.delete();
  return writeResult;
}
