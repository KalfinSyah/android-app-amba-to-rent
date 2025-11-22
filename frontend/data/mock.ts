import { Car, Order, Penalty } from "@/types/models";

export const cars: Car[] = [
  {
    id: "1",
    name: "2025 Mazda CX70",
    brand: "Mazda",
    year: 2025,
    type: "SUV",
    transmission: "Matic",
    fuel: "Bensin",
    pricePerDay: 1500000,
    available: true,
    image: "https://picsum.photos/600/400",
  },
  {
    id: "2",
    name: "VW Passat",
    brand: "Volkswagen",
    year: 2022,
    type: "Sedan",
    transmission: "Matic",
    fuel: "Bensin",
    pricePerDay: 900000,
    available: true,
    image: "https://picsum.photos/600/401",
  },
];

export const orders: Order[] = [
  {
    id: "ORD-1",
    carId: "1",
    carName: "2025 Mazda CX70",
    orderDate: "30/10/2025",
    startDate: "01/11/2025",
    endDate: "03/11/2025",
    status: "Pending",
    totalPrice: 3000000,
  },
];

export const penalties: Penalty[] = [
  {
    id: "PEN-1",
    orderId: "ORD-1",
    type: "Penyok",
    cost: 2000000,
    status: "Terbayar",
    photo: "https://picsum.photos/700/400",
  },
];
