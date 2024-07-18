import { jwtDecode } from "jwt-decode";

class TokenStorageService {
  private tokenKey = 'auth-token';
  private userKey = 'auth-user';

  signOut(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
  }

  public saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey) || null;
  }

  public saveUser(user: any): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(this.userKey);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}

export default TokenStorageService;