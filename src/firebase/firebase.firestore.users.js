import {firestore} from "./firebase.utils";

const USER_TYPE = ['GUEST', 'NORMAL', 'ADMINS']

export const createNewUserIfNoMatch = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.collection('users').doc(user.uid)
  const newUser = await userRef.get();

  if (!newUser.exists) {
    const {displayName, email} = user;
    const createdAt = new Date();
    const userType = USER_TYPE[1];
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (err) {
      console.log(err.message);
    }
  }
  return userRef;
}

export const getUsersByName = async nameString => {
  if(!nameString) return;
  const querySnapshot = await firestore.collection('users').where('displayName', '==', nameString).get();
  return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.ref.id}));
}

export const updateUser = async (userId, updatingField) => {
  const documentRef = firestore.collection('users').doc(userId);
  const writeResult = await documentRef.set(updatingField, {merge: true});
  return writeResult;
}
