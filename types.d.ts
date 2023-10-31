type UserData = {
    email: string
    badge: string
    first_name: string
    last_name: string
    points: number
    image: string
    created_at: Date
    username: string
    isAdmin: boolean,
    id: string
};

type Question = {
    __typename: string
    answer_a: string
    answer_b: string
    answer_c: string
    correct_answer: string
    created_at: Date
    id: string | number
    question: string
    question_level: string
    question_type: string
}

type RouteParams = RouteProp<{ [key: string]: { previousScreen?: string } }, string>;
