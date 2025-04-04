import { init } from "@instantdb/react-native";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

// Enter your app ID here
const APP_ID = "6e5ab9aa-ce41-4b50-a1fd-260848fdfd3e";

const db = init({
  appId: APP_ID,
});

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  iosClientId:
    "568313895998-c041sggh5hnst2tg018m0igi6vpvmpjm.apps.googleusercontent.com",
});

export default function App() {
  const { isLoading, error, user } = db.useAuth();
  if (isLoading) {
    return;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (user) {
    return (
      <View style={styles.container}>
        <Text>Welcome {user.email}</Text>
        <Button
          title="Sign out"
          onPress={async () => {
            await db.auth.signOut();
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          // 1. Sign in to Google
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const idToken = userInfo.data?.idToken;

          if (!idToken) {
            console.error("no ID token present!");
            return;
          }
          // 2. Use your token, and sign into InstantDB!
          try {
            const res = await db.auth.signInWithIdToken({
              clientName: "google-ios",
              idToken,
            });
            console.log("logged in!", res);
          } catch (error) {
            console.log("error signing in", error);
          }
          console.log("done");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
