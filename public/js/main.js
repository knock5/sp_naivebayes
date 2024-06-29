document.addEventListener('DOMContentLoaded', async () => {
  try {
    document
      .getElementById('prediksiForm')
      .addEventListener('submit', function (event) {
        event.preventDefault();

        // Ambil nilai dari form
        const umur = document.getElementById('umur').value;
        const statusPernikahan =
          document.getElementById('statusPernikahan').value;
        const pekerjaan = document.getElementById('pekerjaan').value;
        const penghasilan = document.getElementById('penghasilan').value;
        const tempatTinggal = document.getElementById('tempatTinggal').value;
        const jaminan = document.getElementById('jaminan').value;

        // buat data json input
        let dataInput = {
          umur: umur,
          status_pernikahan: statusPernikahan,
          jaminan: jaminan,
          pekerjaan: pekerjaan,
          penghasilan: penghasilan,
          tempat_tinggal: tempatTinggal,
        };

        const resKelayakan = naiveBayesClassifier(dataInput);

        // Perbarui modal dengan hasil prediksi
        document.getElementById('modalUmur').innerText = umur;
        document.getElementById('modalStatusPernikahan').innerText =
          statusPernikahan;
        document.getElementById('modalPekerjaan').innerText = pekerjaan;
        document.getElementById('modalPenghasilan').innerText = penghasilan;
        document.getElementById('modalTempatTinggal').innerText = tempatTinggal;
        document.getElementById('modalJaminan').innerText = jaminan;
        document.getElementById('modalHasilKelayakan').innerText = resKelayakan;

        // Tampilkan modal
        let myModal = new bootstrap.Modal(
          document.getElementById('resultModal')
        );
        myModal.show();
      });
  } catch (error) {
    console.error('Error fetching or processing dataset:', error);
  }
});

// Sample function to predict loan eligibility (Naive Bayes classifier)
function naiveBayesClassifier(data) {
  // Probabilitas a priori
  const P_diterima = 0.6;
  const P_ditolak = 0.4;

  // Probabilitas kondisional untuk setiap fitur
  const P_umur_diterima = { '20-30': 0.5, '30-40': 0.3, '40-50': 0.2 };
  const P_umur_ditolak = { '20-30': 0.2, '30-40': 0.5, '40-50': 0.3 };

  const P_status_diterima = { menikah: 0.7, lajang: 0.3 };
  const P_status_ditolak = { menikah: 0.3, lajang: 0.7 };

  const P_jaminan_diterima = { KTP: 0.6, BPKB: 0.4 };
  const P_jaminan_ditolak = { KTP: 0.4, BPKB: 0.6 };

  const P_pekerjaan_diterima = {
    PNS: 0.5,
    petani: 0.1,
    pengangguran: 0.1,
    pelajar: 0.1,
    karyawan: 0.2,
  };
  const P_pekerjaan_ditolak = {
    PNS: 0.1,
    petani: 0.3,
    pengangguran: 0.3,
    pelajar: 0.2,
    karyawan: 0.1,
  };

  const P_penghasilan_diterima = {
    '3000000+': 0.7,
    '2000000-3000000': 0.2,
    '1000000-2000000': 0.1,
  };
  const P_penghasilan_ditolak = {
    '3000000+': 0.2,
    '2000000-3000000': 0.3,
    '1000000-2000000': 0.5,
  };

  const P_tempat_tinggal_diterima = { sendiri: 0.8, kontrak: 0.2 };
  const P_tempat_tinggal_ditolak = { sendiri: 0.3, kontrak: 0.7 };

  // Fungsi untuk mengkategorikan umur
  function kategoriUmur(umur) {
    if (umur >= 20 && umur <= 30) return '20-30';
    if (umur > 30 && umur <= 40) return '30-40';
    if (umur > 40 && umur <= 50) return '40-50';
    return null;
  }

  const kategoriUmurDiterima = P_umur_diterima[kategoriUmur(data.umur)];
  const kategoriUmurDitolak = P_umur_ditolak[kategoriUmur(data.umur)];

  if (!kategoriUmurDiterima || !kategoriUmurDitolak) {
    console.error('Kategori umur tidak valid:', data.umur);
    return 'Data umur tidak valid';
  }

  // Hitung probabilitas posterior untuk kedua kelas
  const P_x_diterima =
    P_diterima *
    kategoriUmurDiterima *
    P_status_diterima[data.status_pernikahan] *
    P_jaminan_diterima[data.jaminan] *
    P_pekerjaan_diterima[data.pekerjaan] *
    P_penghasilan_diterima[data.penghasilan] *
    P_tempat_tinggal_diterima[data.tempat_tinggal];

  const P_x_ditolak =
    P_ditolak *
    kategoriUmurDitolak *
    P_status_ditolak[data.status_pernikahan] *
    P_jaminan_ditolak[data.jaminan] *
    P_pekerjaan_ditolak[data.pekerjaan] *
    P_penghasilan_ditolak[data.penghasilan] *
    P_tempat_tinggal_ditolak[data.tempat_tinggal];

  console.log(`PxDiterima: ${P_x_diterima}`);
  console.log(`PxDitolak: ${P_x_ditolak}`);

  // Bandingkan probabilitas posterior dan tentukan hasilnya
  return P_x_diterima > P_x_ditolak ? 'Diterima' : 'Ditolak';
}
