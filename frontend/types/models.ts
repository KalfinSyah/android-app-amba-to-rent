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


export interface Order {
  id: number;
  car_id: number;
  user_id: number;
  method_id: number;
  tanggal_order: string;
  durasi_sewa: number;
  tanggal_sewa: string;
  tanggal_kembali_sewa: string;
  tanggal_transaksi: string;
  status_order: string;
  total_harga: number;
}


export interface Penalty {
  id: number;
  order_id: number;
  jenis_penalty: string;
  biaya_penalty: number;
  foto_penalty: string;
  status_penalty: string;
}

export interface TransactionMethod {
  id: number;
  nama_method: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}