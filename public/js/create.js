console.log('create');

// Function to update the result
function updateResult() {
  const umur = parseInt(document.querySelector('input[name="umur"]').value);
  const status_pernikahan = document.querySelector(
    'select[name="status_pernikahan"]'
  ).value;
  const pekerjaan = document.querySelector('select[name="pekerjaan"]').value;
  const penghasilan = parseInt(
    document.querySelector('input[name="penghasilan"]').value.replace(/,/g, '')
  );
  const tempat_tinggal = document.querySelector(
    'select[name="tempat_tinggal"]'
  ).value;
  const jaminan = document.querySelector('select[name="jaminan"]').value;

  if (
    umur &&
    status_pernikahan &&
    pekerjaan &&
    penghasilan &&
    tempat_tinggal &&
    jaminan
  ) {
    // Probabilities
    const probLayak = 0.6;
    const probTidakLayak = 0.4;

    // Feature probabilities
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

    document.getElementById('hasilPrediksi').value = result;
  }
}

// Event listeners for form inputs
document.querySelectorAll('input, select').forEach((element) => {
  element.addEventListener('change', updateResult);
});
