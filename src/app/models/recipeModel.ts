export interface recipe {
    title: string;
    user: string;
    cookTime: number;
    imageLink: string;
    ingredientList: ingredient[];
    stepList: step[];
}

interface ingredient {
    name: string;
    quantity: string;
}

interface step {
    sequence: number;
    body: string;
}