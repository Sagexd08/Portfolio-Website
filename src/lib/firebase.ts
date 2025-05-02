// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKbpx3tSaRNtRrr84hdQpw--dsg-bhjzI",
  authDomain: "sohom-portfolio-website.firebaseapp.com",
  projectId: "sohom-portfolio-website",
  storageBucket: "sohom-portfolio-website.firebasestorage.app",
  messagingSenderId: "1071950939047",
  appId: "1:1071950939047:web:c8c75824a7318d1cab6c82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics - only on client side
let analytics = null;

// Function to initialize analytics
const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized');
      } else {
        console.log('Firebase Analytics not supported in this environment');
      }
    } catch (error) {
      console.error('Error initializing Firebase Analytics:', error);
    }
  }
};

// Call the function
initAnalytics();

export { app, analytics, initAnalytics };
export default app;
