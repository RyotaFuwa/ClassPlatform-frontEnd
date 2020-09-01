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

export const deleteClass = async classId => {
  const documentRef = firestore.collection('classes').doc(classId);
  const snapshot = await documentRef.get();
  await snapshot.data().docs.forEach(doc => deleteCleanDoc(doc.cleanDocId))
  await deleteChat(snapshot.data().chatId)
  await documentRef.delete();
}


//Clean Doc, json for formatted document.

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

//Chat
export const importMessagesAt  = async (chatId) => {
  const query = firestore.collection('chat').doc(chatId)
    .collection('messages').orderBy('createdAt')
  const snapshot = query.get();
  return snapshot;
}

export const createChat = async () => {
  const query = firestore.collection("chat");
  const documentRef = await query.add({});
  return documentRef;
}

export const deleteChat = async chatId => {
  const messageSnapshot = firestore.collection("chat").doc(chatId)
    .collection('messages').get();
  if(messageSnapshot.docs) {
    messageSnapshot.docs.forEach(doc => doc.ref.delete())
  }
  await firestore.collection("chat").doc(chatId).delete();
}

export const subscribeLastMessage = (chatId, snapshotCallback) => {
  const unsubscribe = firestore.collection('chat').doc(chatId)
    .collection('messages').orderBy('createdAt').limitToLast(1)
    .onSnapshot(snapshotCallback);
  return unsubscribe;
}
export const postMessageAt = async (chatId, message, author) => {
  const query = firestore.collection("chat").doc(chatId).collection('messages');
  const documentRef = await query.add({message: message, author: author, createdAt: new Date()});
  return documentRef;
}

export const deleteFirstNMessages = async (chatId, n) => {
  const query = firestore.collection("chat").doc(chatId)
    .collection('messages').orderBy('createdAt').limitToFirst(n);
  const querySnapshot = await query.get();
  querySnapshot.docs.forEach(doc => doc.ref.delete());
}

