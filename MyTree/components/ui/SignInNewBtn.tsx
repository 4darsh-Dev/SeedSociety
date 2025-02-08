import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri();

export default function SignInNewBtn() {
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  console.log(discovery);
  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '971432129340-2p2q40iuj7re0gthutd7ehul7ddt3qtl.apps.googleusercontent.com',
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
    },
    discovery
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login!" disabled={!request} onPress={() => promptAsync()} />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
}
