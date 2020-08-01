import {firestore} from "./firebase.utils";

export const getAllCodingQuestions = async () => {
  const query = firestore.collection('codingQuestions');
  const querySnapshot = await query.get();
  return querySnapshot;
}

export const createCodingQuestion = async newQuestion => {
  let query = firestore.collection('codingQuestions');
  let documentRef = await query.add(newQuestion);
  return documentRef;
}

export const updateCodingQuestion = async (questionId, updatingFields) => {
  let documentRef = firestore.collection('codingQuestions').doc(questionId);
  let writeResult = await documentRef.set(updatingFields, {merge: true});
  return writeResult;
}

//There is only one questionContents document.
export const getQuestionContentsByName = async questionName => {
  const query = firestore.collection('codingQuestions').collection('questionContents');
  const querySnapshot = await query.limit(1).get();
  console.log(querySnapshot.docs[0].data());
  return querySnapshot.docs[0];
}

//There is only one questionContents document.
export const updateQuestionContents = async (questionId, updatingFields) => {
  const query = firestore.collection('codingQuestions').doc(questionId).collection('questionContents');
  const writeResult = await query.limit(1).set(updatingFields, {merge: true});
  console.log(writeResult);
  return writeResult
}
