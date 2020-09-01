import {firestore} from "./firebase.utils";

// Coding Question
export const getAllCodingQuestions = async () => {
  const query = firestore.collection('codingQuestions');
  const querySnapshot = await query.get();
  return querySnapshot;
}

export const getCodingQuestionByName = async questionName => {
  const query = firestore.collection('codingQuestions')
    .where('name', '==', questionName)
    .limit(1)
  const querySnapshot = await query.get(); //[ codingQuestion ]
  if(querySnapshot.docs.length !== 1) {
    alert('Failed to get the requested coding question');
  }
  return querySnapshot.docs[0];
}

export const createCodingQuestion = async newQuestion => {
  const contentRef = await createContent();
  let query = firestore.collection('codingQuestions');
  let questionRef = await query.add({...newQuestion, active: true, contentId: contentRef.id});
  return [questionRef, contentRef];
}

export const updateCodingQuestion = async (questionId, updatingFields) => {
  let documentRef = firestore.collection('codingQuestions').doc(questionId);
  let writeResult = await documentRef.set(updatingFields, {merge: true});
  return writeResult;
}

export const deleteCodingQuestion = async questionId => {
  const documentRef = firestore.collection('codingQuestions').doc(questionId);
  const snapshot = await documentRef.get();
  await deleteContent(snapshot.data().contentId);
  const writeResult = await documentRef.delete();
  return writeResult;
}

// Question Content
//Assumption: there is only one questionContent document.

export const createContent = async () => {
  let documentRef = await firestore.collection('questionContent').add(
    {instruction: '', tips: [], pseudo: '', text: '', solution: '', tests: []}
  )
  return documentRef;
}

export const getContent = async contentId => {
  const query = firestore.collection('questionContent').doc(contentId)
  const documentSnapshot = await query.get();
  return documentSnapshot;
}

//Assumption: there is only one questionContent document.
export const updateContent = async (contentId, updatingFields) => {
  const query = firestore.collection('questionContent').doc(contentId);
  const writeResult = await query.set(updatingFields, {merge: true});
  return writeResult;
}

export const deleteContent = async contentId => {
  const writeResult = await firestore.collection('questionContent').doc(contentId).delete();
  return writeResult;
}
