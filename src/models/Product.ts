import { Model } from '@vuex-orm/core';

export default class Product extends Model {
  public static entity: string = 'products';

  public static fields(): any {
    return {
      id: this.increment(),
      name: this.attr(null),
      description: this.attr(null).nullable(),
      image: this.attr(null).nullable(),
    };
  }

  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string;
}
