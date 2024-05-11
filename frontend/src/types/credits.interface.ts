export interface ICredits {
    cast: ICast[];
    writers: ICrew[];
    directors: ICrew[];
}

export interface ICrew {
    name: string;
    episodes_count: number;
}

export interface ICast extends ICrew {
    image_link: string;
    character: string;
}