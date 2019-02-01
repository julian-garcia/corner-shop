export class Order {
  constructor(public customerName: string,
              public customerAddress: string,
              public customerCity: string,
              public productsOrdered: {productId:string, productCount: number}[],
              public orderTotal: number,
              public orderDate: string) {}
}