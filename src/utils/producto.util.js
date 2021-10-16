import faker from "faker";
faker.locale = "es";

export default function generateProducto() {
  return {
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    foto: faker.image.imageUrl(),
  };
}
