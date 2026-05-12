import React, { useState } from 'react';

export interface DataRekapMingguan {
  nama_pegawai: string;
  tanggal_mulai: string;
  tanggal_akhir: string;
  total_hari_hadir: number;
  total_gaji_pokok_mingguan: number;
  total_bonus_kerapian_mingguan: number;
  total_bonus_disiplin_mingguan: number;
  tipe_bonus_mingguan_didapat: string;
  total_pendapatan_bersih_mingguan: number;
  total_denda_mingguan: number;
}

export interface DataRekapTahunan {
  periode_tahun: string;
  total_hadir_setahun: number;
  total_jam_lembur_setahun: number;
  total_bonus_mingguan_terkumpul: number;
  nominal_thr_pokok: number;
  nominal_bonus_lembur_tahunan: number;
  total_thr_diterima: number;
  is_dibayarkan: boolean;
  tanggal_pembayaran: string;
}

// Helper untuk format mata uang Rupiah
const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// === 2. KOMPONEN TABEL REKAP MINGGUAN ===

export const TabelRekapMingguan: React.FC<{ data: DataRekapMingguan[] }> = ({ data }) => {
  // State untuk melacak baris mana yang sedang dibuka
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (idx: number) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3">Nama Pegawai</th>
            <th className="px-4 py-3">Periode</th>
            <th className="px-4 py-3">Gaji Pokok</th>
            <th className="px-4 py-3">Total Bonus</th> {/* Hanya tampilkan Totalnya saja */}
            <th className="px-4 py-3 text-blue-700">Total Bersih</th>
            <th className="px-4 py-3">Detail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, idx) => (
            <React.Fragment key={idx}>
              <tr className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 font-semibold text-gray-900 text-lg">{item.nama_pegawai}</td>
                <td className="px-4 py-4 text-[15px]">{item.tanggal_mulai} - {item.tanggal_akhir}</td>
                <td className="px-4 py-4 font-mono text-lg">{formatIDR(item.total_gaji_pokok_mingguan)}</td>
                <td className="px-4 py-4 font-medium text-green-600 text-lg">
                  {formatIDR(item.total_bonus_kerapian_mingguan + item.total_bonus_disiplin_mingguan)}
                </td>
                <td className="px-4 py-4 font-bold text-gray-900 text-lg">{formatIDR(item.total_pendapatan_bersih_mingguan)}</td>
                <td className="px-4 py-4">
                  <button 
                    onClick={() => toggleRow(idx)}
                    className="text-blue-600 hover:underline font-bold text-lg"
                  >
                    {expandedRow === idx ? 'Tutup' : 'Rincian'}
                  </button>
                </td>
              </tr>
              
              {/* BARIS EKSPANSI: Muncul jika tombol Rincian diklik */}
              {expandedRow === idx && (
                <tr className="bg-blue-50/50">
                  <td colSpan={6} className="px-8 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-white rounded border border-blue-100 shadow-sm">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Tunkin Kerapian</p>
                        <p className="font-semibold text-lg">{formatIDR(item.total_bonus_kerapian_mingguan)}</p>
                      </div>
                      <div className="p-3 bg-white rounded border border-blue-100 shadow-sm">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Tunkin Disiplin</p>
                        <p className=" font-semibold text-lg">{formatIDR(item.total_bonus_disiplin_mingguan)}</p>
                      </div>
                      {/* Tambahkan atribut tunkin lainnya di sini dengan mudah */}
                      <div className="p-3 bg-white rounded border border-blue-100 shadow-sm">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Denda Mingguan</p>
                        <p className="font-semibold text-red-600 text-lg">-{formatIDR(item.total_denda_mingguan)}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// === KOMPONEN TABEL TAHUNAN ===
export const TabelRekapTahunan: React.FC<{ data: DataRekapTahunan[] }> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-slate-800">
          <tr>
            <th className="px-4 py-4">Tahun</th>
            <th className="px-4 py-4 text-center">Total Hadir</th>
            <th className="px-4 py-4 text-center">Jam Lembur</th>
            <th className="px-4 py-4">Bonus Terkumpul</th>
            <th className="px-4 py-4 text-green-400">Total THR</th>
            <th className="px-4 py-4">Tgl Bayar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? data.map((item, idx) => (
            <tr key={idx} className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 font-bold text-gray-900 text-lg">{item.periode_tahun}</td>
              <td className="px-4 py-4 text-center text-lg">{item.total_hadir_setahun} Hari</td>
              <td className="px-4 py-4 text-center text-lg">{item.total_jam_lembur_setahun} Jam</td>
              <td className="px-4 py-4 text-lg">{formatIDR(item.total_bonus_mingguan_terkumpul)}</td>
              <td className="px-4 py-4 font-bold text-green-700 text-lg">{formatIDR(item.total_thr_diterima)}</td>
              <td className="px-4 py-4 font-mono text-lg">{item.tanggal_pembayaran}</td>
            </tr>
          )) : (
            <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 italic">Data tahunan kosong.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};