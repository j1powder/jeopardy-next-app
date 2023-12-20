'use client'

import { createContext, useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(projectAuth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (displayName, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(projectAuth, email, password);
      console.log('Signed User Up', res.user);
       // add display name to user
    await updateProfile(res.user,{ displayName: displayName });
   
/*     await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        email,
        courses:[],
        companyName,
        firstName:firstName,
        lastName:lastName,
        address:"",
        userPermissionLevel: null
    }) */
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(projectAuth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(projectAuth);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(projectAuth, email);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOutUser,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
