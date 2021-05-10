export interface WORKOUTS_TYPE {
    workouts: WORKOUT[];
}

export interface WORKOUT {
    id: string;
    name: string;
    coverImage: Asset;
    exercises: Exercise[];
}

export interface Exercise {
    name: string;
    instruction: string;
    image: Asset;
    video: Asset;
}

export interface Asset {
    uri: string;
}