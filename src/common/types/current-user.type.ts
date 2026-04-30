export interface CurrentUserPayload {
  id?: string;
  name?: string;
  username?: string;
  email: string;
  photoUrl?: string;
  photoURL?: string;
  lastLogin?: string | Date | null;
  isAdmin?: boolean;
}
