export interface IIngredientsPropTypes {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  _id: string;
  uniqId: string;
  qty: number;
}

export interface CustomResponse extends Body {
  accessToken: string | null;
  refreshToken: string;
  value: Response;
  success: boolean;
  ok: boolean;
  message?: string;
  headers?: Headers;
  json(): any;
}
