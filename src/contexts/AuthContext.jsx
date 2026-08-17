import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getUserRole } from '../services/authService.js';
import { auth } from '../services/firebase.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Fetch the role from your service
          const userRole = await getUserRole(firebaseUser.uid);
          setRole(userRole);
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Fallback if role fetch fails (optional)
          setRole('patient'); 
        }
      } else {
        setUser(null);
        setRole(null);
      }
      // Always set loading to false when auth state resolves
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const value = {
    user,
    role,
    loading,
    // Helper booleans for easy conditional rendering
    isAdmin: role === 'admin',
    isDoctor: role === 'doctor',
    isPatient: role === 'patient'
  };

  return (
    <AuthContext.Provider value={value}>
      {/* CRITICAL FIX: Do not render children until loading is false. 
          This prevents routing bugs and Firestore permission errors on refresh. */}
      {!loading && children} 
    </AuthContext.Provider>
  );
};