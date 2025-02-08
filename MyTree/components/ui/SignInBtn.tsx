import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { auth } from '@/firebaseConfig'; // Import from your Firebase config
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const GOOGLE_CLIENT_ID = "971432129340-2p2q40iuj7re0gthutd7ehul7ddt3qtl.apps.googleusercontent.com"; // Replace with your actual Google Client ID



const SignInBtn = () => {
  const signInWithGoogle = async () => {
    try {
      // Create a redirect URI using the scheme defined in app.json
      const redirectUri = AuthSession.makeRedirectUri({ scheme: 'myapp' });
      console.log('Redirect URI:', redirectUri);
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      };
      // Build the auth request
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        redirectUri,
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Token,
      });

      // Load the request
      await request.makeAuthUrlAsync(discovery);

      // Open the browser for Google Sign-In
      const result = await request.promptAsync(discovery);

      if (result.type === 'success') {
        // Use the ID token to sign in with Firebase
        const credential = GoogleAuthProvider.credential(result.params.id_token);
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed in:', userCredential.user);
      } else {
        console.error('Google Sign-In canceled or failed.');
      }
    } catch (error) {
      console.error('Error with Google Sign-In:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In with Google" onPress={signInWithGoogle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInBtn;