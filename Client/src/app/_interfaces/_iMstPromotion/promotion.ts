import { PromotionDetail } from "./promotionDetail";

export class Promotion{
  id?: number;
  promotionContent?: string;
  fromDate?: Date;
  toDate?: Date;
  description?: string;
  promotionDetails?: PromotionDetail[];
}
