import React, { useState, type ChangeEvent } from 'react';
import { 
  TabelRekapMingguan, 
  TabelRekapTahunan, 
  type DataRekapMingguan, 
  type DataRekapTahunan 
} from '../../../components/ui/tabel/tabelRekaptahunan/TabelRekapTahunan';
import InputSelect from '../../../components/ui/InputSelect';

export default function GajiTunjanganIndex() {
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null);

  // --- DATA DUMMY FILTER ---
  const opsiDept = [
    { value: "prod", label: "Produksi" },
    { value: "log", label: "Logistik" }
  ];

  const opsiDivisi = [
    { value: "Oven", label: "Oven", dept: "prod" },
    { value: "Pack", label: "Packing", dept: "prod" },
    { value: "Gudang", label: "Gudang Utama", dept: "log" },
    { value: "Cetak", label: "Cetak", dept: "prod" },
  ];

  // --- DATA DUMMY KARYAWAN (Banyak Data) ---
  const semuaKaryawan = [
    // Divisi Oven
    { id: "1", nama: "Ambalit", div: "Oven", gaji_pokok: 1500000, tunkin: 200000, total_thr: 11000000, total: 12700000 },
    { id: "2", nama: "Cukaminya", div: "Oven", gaji_pokok: 1500000, tunkin: 150000, total_thr: 10500000, total: 12150000 },
    // Divisi Packing
    { id: "3", nama: "Budi Packing", div: "Pack", gaji_pokok: 1400000, tunkin: 100000, total_thr: 9000000, total: 10500000 },
    { id: "4", nama: "Siti Pack", div: "Pack", gaji_pokok: 1400000, tunkin: 100000, total_thr: 9000000, total: 10500000 },
    //nyetak
    { id: "4", nama: "deni caknan", div: "Cetak", gaji_pokok: 1400000, tunkin: 100000, total_thr: 9000000, total: 10500000 },
    // Divisi Logistik
    { id: "5", nama: "Agus Logistik", div: "Gudang", gaji_pokok: 1600000, tunkin: 300000, total_thr: 12000000, total: 13900000 },
  ];

  // Logic: Filter divisi berdasarkan departemen, dan karyawan berdasarkan divisi
  const divisiFiltered = opsiDivisi.filter(d => d.dept === selectedDept);
  const karyawanFiltered = semuaKaryawan.filter(k => k.div === selectedDiv);

  // --- DATA UNTUK DETAIL (DUMMY) ---
  const dataMingguanDummy: DataRekapMingguan[] = selectedKaryawan ? [
    {
      nama_pegawai: selectedKaryawan.nama,
      tanggal_mulai: "2026-05-04",
      tanggal_akhir: "2026-05-10",
      total_hari_hadir: 6,
      total_gaji_pokok_mingguan: selectedKaryawan.gaji_pokok,
      total_bonus_kerapian_mingguan: 100000,
      total_bonus_disiplin_mingguan: 100000,
      tipe_bonus_mingguan_didapat: "Full",
      total_pendapatan_bersih_mingguan: selectedKaryawan.total,
      total_denda_mingguan: 0,
    }
  ] : [];

  const dataTahunanDummy: DataRekapTahunan[] = selectedKaryawan ? [
    {
      periode_tahun: "2026",
      total_hadir_setahun: 280,
      total_jam_lembur_setahun: 45,
      total_bonus_mingguan_terkumpul: 4800000,
      nominal_thr_pokok: selectedKaryawan.total_thr,
      nominal_bonus_lembur_tahunan: 1200000,
      total_thr_diterima: selectedKaryawan.total_thr,
      is_dibayarkan: false,
      tanggal_pembayaran: "-",
    }
  ] : [];

  return (
    <div className="p-6 space-y-6">
      {/* SECTION 1: FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <InputSelect 
          label="Departemen"
          options={opsiDept}
          value={selectedDept}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedDept(e.target.value);
            setSelectedDiv("");
            setSelectedKaryawan(null);
          }}
        />
        <InputSelect 
          label="Divisi"
          options={divisiFiltered} // Menggunakan data yang sudah difilter
          value={selectedDiv}
          disabled={!selectedDept}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedDiv(e.target.value);
            setSelectedKaryawan(null);
          }}
        />
      </div>

      {/* SECTION 2: TABEL RINGKASAN DIVISI */}
      {selectedDiv && !selectedKaryawan && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">
              Daftar Gaji & THR: Divisi {selectedDiv}
            </h3>
            <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full font-bold">
              {karyawanFiltered.length} Orang
            </span>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3 text-right">Gaji Pokok</th>
                <th className="px-4 py-3 text-right">Tunkin</th>
                <th className="px-4 py-3 text-right">Total THR</th>
                <th className="px-4 py-3 font-bold text-blue-600 text-right">Total</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {karyawanFiltered.map((k) => (
                <tr key={k.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-gray-900 text-base">{k.nama}</td>
                  <td className="px-4 py-4 font-mono text-base text-right">Rp {k.gaji_pokok.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 font-mono text-base text-green-600 font-bold text-right">Rp {k.tunkin.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 font-mono text-base text-right">Rp {k.total_thr.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 font-black text-gray-900 text-lg text-right bg-blue-50/30">Rp {k.total.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => setSelectedKaryawan(k)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      Rincian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 3: DETAIL INDIVIDU */}
      {selectedKaryawan && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          <button 
            onClick={() => setSelectedKaryawan(null)}
            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-2 group mb-4"
          >
            ← Kembali ke Daftar Divisi
          </button>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] opacity-80 uppercase tracking-[0.2em] font-black mb-1">Karyawan Terpilih</p>
                <h2 className="text-2xl font-black">{selectedKaryawan.nama}</h2>
                <p className="text-xs mt-1 bg-white/20 w-fit px-2 py-0.5 rounded">Divisi: {selectedKaryawan.div}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-80 uppercase font-bold">ID Karyawan</p>
                <p className="font-mono text-lg">#00{selectedKaryawan.id}</p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
             <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
               Rekapitulasi Mingguan
             </h2>
             <TabelRekapMingguan data={dataMingguanDummy} />
          </section>

          <section className="space-y-4">
             <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <span className="w-1.5 h-5 bg-orange-500 rounded-full"></span>
               Rekapitulasi Tahunan & THR
             </h2>
             <TabelRekapTahunan data={dataTahunanDummy} />
          </section>
        </div>
      )}
    </div>
  );
}