export interface recipeModel {
    id: string;
    title: string;
    user: string;
    cookTime: number;
    imageLink?: string;
    ingredientList: ingredient[];
    stepList: step[];
}

export interface ingredient {
    name: string;
    quantity: string;
}

export interface step {
    id: string;
    sequence: number;
    body: string;
}