document
  .getElementById('prediksiForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const umur = parseInt(document.getElementById('umur').value);
    const status_pernikahan = document.getElementById('statusPernikahan').value;
    const pekerjaan = document.getElementById('pekerjaan').value;
    const penghasilan = parseInt(document.getElementById('penghasilan').value);
    const tempat_tinggal = document.getElementById('tempatTinggal').value;
    const jaminan = document.getElementById('jaminan').value;

    // probabilitas
    const probLayak = 0.6;
    const probTidakLayak = 0.4;

    // Feature probabilitas
    const featureProbs = {
      umur: { layak: 0.5, tidak_layak: 0.5 },
      status_pernikahan: {
        menikah: { layak: 0.6, tidak_layak: 0.4 },
        lajang: { layak: 0.4, tidak_layak: 0.6 },
      },
      pekerjaan: {
        PNS: { layak: 0.7, tidak_layak: 0.3 },
        petani: { layak: 0.5, tidak_layak: 0.5 },
        pengangguran: { layak: 0.3, tidak_layak: 0.7 },
        pelajar: { layak: 0.4, tidak_layak: 0.6 },
        karyawan: { layak: 0.6, tidak_layak: 0.4 },
      },
      penghasilan: { layak: 0.5, tidak_layak: 0.5 },
      tempat_tinggal: {
        sendiri: { layak: 0.6, tidak_layak: 0.4 },
        kontrak: { layak: 0.4, tidak_layak: 0.6 },
      },
      jaminan: {
        KTP: { layak: 0.5, tidak_layak: 0.5 },
        BPKB: { layak: 0.6, tidak_layak: 0.4 },
      },
    };

    // Calculate Naive Bayes probability
    const probLayakFinal =
      probLayak *
      featureProbs.umur.layak *
      featureProbs.status_pernikahan[status_pernikahan].layak *
      featureProbs.pekerjaan[pekerjaan].layak *
      featureProbs.penghasilan.layak *
      featureProbs.tempat_tinggal[tempat_tinggal].layak *
      featureProbs.jaminan[jaminan].layak;

    const probTidakLayakFinal =
      probTidakLayak *
      featureProbs.umur.tidak_layak *
      featureProbs.status_pernikahan[status_pernikahan].tidak_layak *
      featureProbs.pekerjaan[pekerjaan].tidak_layak *
      featureProbs.penghasilan.tidak_layak *
      featureProbs.tempat_tinggal[tempat_tinggal].tidak_layak *
      featureProbs.jaminan[jaminan].tidak_layak;

    // Determine the result
    const result =
      probLayakFinal > probTidakLayakFinal ? 'Layak' : 'Tidak Layak';

    // Display the result in the modal
    document.getElementById('modalUmur').innerText = umur;
    document.getElementById('modalStatusPernikahan').innerText =
      status_pernikahan;
    document.getElementById('modalPekerjaan').innerText = pekerjaan;
    document.getElementById('modalPenghasilan').innerText = penghasilan;
    document.getElementById('modalTempatTinggal').innerText = tempat_tinggal;
    document.getElementById('modalJaminan').innerText = jaminan;
    document.getElementById('modalProbLayak').innerText =
      probLayakFinal.toFixed(2);
    document.getElementById('modalProbTidakLayak').innerText =
      probTidakLayakFinal.toFixed(2);
    document.getElementById('modalHasilKelayakan').innerText = result;
  });
