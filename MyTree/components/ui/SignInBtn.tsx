import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
const { EXPO_PUBLIC_WEB_CLIENT_ID } = process.env;
import { getExpoGoEnvironment } from 'expo-dev-client';
const SignInBtn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        EXPO_PUBLIC_WEB_CLIENT_ID, // From Firebase Console
      offlineAccess: true // Optional: If you need to access Google APIs on the backend
    })
  }, []);

  const navigation = useRouter()

  const signInWithGoogle = async () => {
    try {
      // Check if Google Play Services is available
      await GoogleSignin.hasPlayServices();
      // Get the user's ID token
      const res = await GoogleSignin.signIn();
      const { idToken } = res.data;
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign in with the credential
      await auth().signInWithCredential(googleCredential);
      //get user
      const user = auth().currentUser;
      navigation.navigate('/(tabs)')
    } catch (error) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log('User cancelled the login flow');
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log('Sign-in is already in progress');
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   console.log('Google Play Services not available or outdated');
      // } else {
        console.error('Google Sign-In Error:', error);
      // }
    }
  };
  const signOut = async () => {
    try {
      // Sign out from Firebase
      await auth().signOut();
      // Sign out from Google
      await GoogleSignin.signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default SignInBtn;