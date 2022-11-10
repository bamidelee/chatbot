import {gql} from '@apollo/client'



export const USER_DETAILS = gql`
    query findUserByUsername($username: String){
        findUser(username: $username){
            username
            messages{
                text
                sender
            }
        }
    }
`

export const SIGNUP = gql`
    mutation createUser($username: String!, $name: String!, $password: String!){
        signUp(username: $username, name: $name, password: $password){
            username
            name
        }
    }
`

export const SIGN_IN = gql`
    mutation logIn($username: String!, $password: String!){
        signIn(username: $username, password: $password){
            username
        }
    }
`

export const TEXT = gql`
    mutation messageUser($sender: Boolean, $text: String, $username: String){
        text(sender: $sender, text: $text, username: $username){
            text
        }
    }
`