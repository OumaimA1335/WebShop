import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendEmailVerification,
  updatePassword,
  updateEmail,
  updateProfile,
  deleteUser

} from "firebase/auth";
import { auth } from "../Config/FirebaseConfig";
import zxcvbn from 'zxcvbn';
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({
  children}) => {
  const [isuser, setisUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    localStorage.setItem("logged",false);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(auth.currentUser);
      if (user) {
        setisUser(auth.currentUser.toJSON());
      
      } else {
        setisUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function validatePassword(password) {
    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 3) {
      throw new Error('Password is not strong enough');
    }
  };

  const signup = async (email, password) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userInfo.user);
      console.log("check your email to verify your email");
  
      if (userInfo.user.emailVerified) {
        console.log("verified");
      } else {
        console.log("not verified");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        
        setErrorMessage("Email déja utilisée");
      } else if (error.code === "auth/weak-password") {
       
        setErrorMessage("Mot de passe n'est pas assez fort");
      }
      else
      {
        setErrorMessage("Un probléme servenue , s'il vous plait réessayer");
      }
      return error;
    }
  };
  
  const login = async(email, password) => {
    try{
     await signInWithEmailAndPassword(auth, email, password);
     localStorage.setItem("logged",true);
    }catch(error)
    {
      console.log(error);
      return error
    }
   
  };
  const logout = async () => {
   // setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role_id");
    localStorage.setItem("logged",false);
    setErrorMessage(null);
    await signOut(auth);
  };
  const GoogleAuth = new GoogleAuthProvider();
  const signinGoogle = async () => {
    const result = await signInWithPopup(auth, GoogleAuth);
  };
  const FaceBookAuth = new FacebookAuthProvider();
  const signinFaceBook = async () => {
    const result = await signInWithPopup(auth, FaceBookAuth);
  };
  const email = async (newPassword, newPhotoURL) => {
    // Mettre à jour le mot de passe de l'utilisateur
    try{
      await updatePassword(auth.currentUser, newPassword)
      await updateProfile(auth.currentUser, {
        photoURL: newPhotoURL
      });
        
    }catch(err)
    {
      console.log(err)
      return err
    }
  };
  


const deleteuser =()=>{
  deleteUser(user).then(() => {
    console.log("User Deleted")
  }).catch((error) => {
    console.log(error)
  });
}
  return (
    <AuthContext.Provider
      value={{ isuser,errorMessage, login, signup, logout, signinGoogle, signinFaceBook,email,deleteuser  }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
