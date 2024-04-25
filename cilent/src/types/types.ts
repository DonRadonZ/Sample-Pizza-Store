export interface IPizza {
    id: number; 
    name: string;
    unitPrice: number;
    ingredients: string[];
    soldOut: boolean;
    imageUrl: string;
}

export interface Item {
    pizzaId: number;
    name: string
    quantity: number
    totalPrice: number;
}

export interface OrderItemProp {
    item: Item;
    isLoadingIngredients: boolean;
    ingredients: string[]
}

export interface IPosition {
    latitude: number;
    longitude: number;
}

export type ICartItem = {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface IUserState {
    username: string;
}

export type CartStateProps = {
    cart: ICartItem[]
}