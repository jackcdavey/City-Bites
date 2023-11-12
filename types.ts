type Review = {

    id: number;
    name: string;
    comment: string;
    rating: number;
};

type Restaurant = {
    id: number;
    name: string;
    description: string;
    image: string;
    reviews: Review[];
};

export type { Review, Restaurant };
