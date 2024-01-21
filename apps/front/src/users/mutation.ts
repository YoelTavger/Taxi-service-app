import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input ) {
      clientMutationId
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignInUser($input: AuthenticateInput!) {
    authenticate(input: $input) {
      jwtToken
    }
  }
`;