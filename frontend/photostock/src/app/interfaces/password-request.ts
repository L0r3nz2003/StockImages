export interface PasswordRequest {
  id: string;
  token: string;
  oldPassword: string;
  newPassword: string;
}
