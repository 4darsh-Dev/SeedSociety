import SignInBtn from '@/components/ui/SignInBtn';
import { View, Text, Button, StyleSheet } from 'react-native';

const index = () => {

  // const handleSignIn = () => {
  //   // Navigate to the main app screen after signing in
  //   navigation.replace('(tabs)');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <SignInBtn/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default index;