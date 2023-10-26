import { SignInValidResponse } from '@app/core/models/types';

export interface UserDB extends SignInValidResponse {
  password: string;
}

export const USERS_DB: UserDB[] = [
  {
    id: '1',
    accessToken: '123',
    password: '12345678',
    name: 'admin1',
    email: 'admin1@email.com',
    roles: ['admin'],
  },
  {
    id: '2',
    accessToken: '345',
    name: 'user1',
    password: '910111213',
    email: 'user1@email.com',
    roles: ['user'],
  },
  {
    id: '3',
    accessToken: '678',
    name: 'user2',
    password: '1415161718',
    email: 'user2@email.com',
    roles: ['user'],
  },
];
