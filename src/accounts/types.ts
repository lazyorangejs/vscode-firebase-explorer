import * as request from 'request-promise-native';
import { FirebaseProject } from '../projects/ProjectManager';

export interface GoogleOAuthAccessToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface StateAccounts {
  [email: string]: AccountData;
}

export interface AccountData {
  info: AccountInfo;
  projects: FirebaseProject[] | null | undefined;
}

export interface AccountInfo {
  user: AccountUser;
  tokens: AccountTokens;
  origin: 'login' | 'cli';
}

export interface AccountUser {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  iat: number;
  exp: number;
}

export interface AccountTokens {
  expires_at: number;
  refresh_token: string;
  scopes: string[];
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export type RequestOptions = Partial<request.OptionsWithUrl> & {
  retryOn?: number[];
};
