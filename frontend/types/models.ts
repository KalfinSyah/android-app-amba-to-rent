export type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: "SUV" | "Sedan" | "Hatchback";
  transmission: "Matic" | "Manual";
  fuel: "Bensin" | "Diesel";
  pricePerDay: number;
  image?: string;
  available: boolean;
};

export type Order = {
  id: string;
  carId: string;
  carName: string;
  orderDate: string;
  startDate: string;
  endDate: string;
  status: "Pending" | "Confirmed" | "Finished";
  totalPrice: number;
};

export type Penalty = {
  id: string;
  orderId: string;
  type: string;
  cost: number;
  status: "Terbayar" | "Belum Terbayar";
  photo?: string;
};
