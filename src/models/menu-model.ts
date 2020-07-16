import { Indentifiable, IdType } from "../shared/shared";

export interface IMenu extends Indentifiable {
    category: Category[];
    imageUrl: string;
    foodName: string;
    description: string;
    allergens: string;
    quantity: string;
    price: string;
  }

  export enum Category {
    WEEKLYSPECIALS,
    APPETIZERS,
    MAINDISHES,
    DESSERTS,
    BEVERAGES,
  }
  
  export class Menu implements IMenu {
    constructor(
      public _id: IdType,
      public category: Category[] = [Category.WEEKLYSPECIALS],
      public imageUrl: string,
      public foodName: string,
      public description: string,
      public allergens: string,
      public quantity: string,
      public price: string
    ) {}
  }
  