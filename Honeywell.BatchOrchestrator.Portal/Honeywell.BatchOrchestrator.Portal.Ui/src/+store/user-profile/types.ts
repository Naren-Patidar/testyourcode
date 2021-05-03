import { UserProfile } from '../../core/authentication/models/user-profile';

export interface UserProfileState {
  error: string;
  authenticated: boolean | null;
  authenticating: boolean | null;
  userInfo: UserProfile;
}
