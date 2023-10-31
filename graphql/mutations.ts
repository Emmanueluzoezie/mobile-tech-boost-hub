import { gql } from "@apollo/client";

export const ADD_USER = gql`
 mutation MyMutation(
    $email: String
    $badge: String
    $first_name: String
    $last_name: String
    $points: Float
    $image: String
    $created_at: DateTime!
    $username: String
    $isAdmin: Boolean
 ){
    insertUser(
        email: $email
        badge: $badge
        first_name: $first_name
        last_name: $last_name
        image: $image
        created_at: $created_at
        points: $points
        username: $username
        isAdmin: $isAdmin
    ){
        id
        email
        badge
        first_name
        last_name
        image
        created_at
        points
        username
        isAdmin
    }
 }
`

export const UPDATE_POINTS = gql`
 mutation MyMutation(
    $id: ID!
    $points: Float
    ){
        updateUserCoins(
            id: $id
            points: $points
            ){
                id
                email
                badge
                first_name
                last_name
                image
                created_at
                points
                username
                isAdmin
            }
    }
`

export const ADD_USER_HISTORY = gql`
 mutation MyMutation(
    $created_at: DateTime!
    $title: String
    $user_id: ID
    $points: Float
    $decription: String
 ){
    insertHistory(
        title: $title
        user_id: $user_id
        created_at: $created_at
        points: $points
        decription: $decription
    ){
        id,
        created_at
        title
        user_id
        points
        decription
    }
 }
`