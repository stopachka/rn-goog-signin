import { init, i, InstaQLEntity } from "@instantdb/react-native";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// ID for app: rn-g-signin
const APP_ID = "6e5ab9aa-ce41-4b50-a1fd-260848fdfd3e";

const db = init({ appId: APP_ID });

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId:
    "568313895998-c041sggh5hnst2tg018m0igi6vpvmpjm.apps.googleusercontent.com",
});

export default function App() {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        // try {
        //   await GoogleSignin.hasPlayServices();
        //   const userInfo = await GoogleSignin.signIn();
        //   if (userInfo.data.idToken) {
        //     const { data, error } = await supabase.auth.signInWithIdToken({
        //       provider: "google",
        //       token: userInfo.data.idToken,
        //     });
        //     console.log(error, data);
        //   } else {
        //     throw new Error("no ID token present!");
        //   }
        // } catch (error: any) {
        //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     // user cancelled the login flow
        //   } else if (error.code === statusCodes.IN_PROGRESS) {
        //     // operation (e.g. sign in) is in progress already
        //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     // play services not available or outdated
        //   } else {
        //     // some other error happened
        //   }
        // }
      }}
    />
  );
}
