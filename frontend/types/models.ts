export interface Car {
  id: number;
  tahun_mobil: string;
  merk_mobil: string;
  nama_mobil: string;
  jenis_mobil: string;
  tipe_mesin: string;
  tipe_transmisi: string;
  harga_sewa: number;
  foto_mobil: string;
  status_mobil: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}


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
