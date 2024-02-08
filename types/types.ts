const DEFAULT_PHOTO_URL =
  "https://ik.imagekit.io/cisocodes/the-hook/the-hook-logo-on-white?updatedAt=1707174203769";

class HookUser {
  public uid: string;
  public email: string;
  public providerId: string;
  public displayName?: string;
  public username?: string;
  public photoURL?: string;
  constructor(
    uid: string,
    email: string,
    providerId: string,
    displayName: string = "",
    username: string = "",
    photoURL: string = DEFAULT_PHOTO_URL,
  ) {
    this.uid = uid;
    this.email = email;
    this.providerId = providerId;
    this.displayName = displayName;
    this.username = username;
    this.photoURL = photoURL;
  }
}

export default HookUser;
