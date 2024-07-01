import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase'
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import axios from 'axios';
import { api } from '../utils/axios';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    const updateUser = (displayname, imageUrl) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: displayname,
            photoURL: imageUrl
        })
    }

    const logOut = () => {
        setLoading(true);
        setUser(null);
        const token = localStorage.getItem('token')
        if (token) {
            localStorage.removeItem('token')
        }
        api.get('/logout', { withCredentials: true })
        return signOut(auth)
    }

    const getToken = async email => {
        const { data } = await api.post(
            `/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    const saveUser = async user => {
        const currentUser = {
            email: user?.email,
            role: 'Participant',
            displayName: user?.displayName,
            photoURL: user?.photoURL
        }
        const { data } = await api.put(
            `/user`,
            currentUser
        )
        return data
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user)
                const { token, success } = await getToken(user.email)
                if (success && token) {
                    localStorage.setItem('token', token)
                }
                saveUser(user)
            }
            setLoading(false)
        });
        return () => {
            unSubscribe()
        }
    }, [])


    const userInfo = { user, registerUser, logInUser, updateUser, logOut, loading, setLoading, googleLogin, githubLogin }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider