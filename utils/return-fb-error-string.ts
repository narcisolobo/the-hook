import { FirebaseError } from "firebase/app";

function returnFbErrorString(error: FirebaseError) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/invalid-credential":
      return "Invalid credentials.";
    default:
      return "Something went wrong.";
  }
}

export default returnFbErrorString;
