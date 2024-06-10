document
  .getElementById('prediksiForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const umur = document.getElementById('umur').value;
    const statusPernikahan = document.getElementById('statusPernikahan').value;
    const penghasilan = document.getElementById('penghasilan').value;
    const tempatTinggal = document.getElementById('tempatTinggal').value;

    // Set modal content
    document.getElementById('modalUmur').textContent = umur;
    document.getElementById('modalStatusPernikahan').textContent =
      statusPernikahan;
    document.getElementById('modalPenghasilan').textContent = penghasilan;
    document.getElementById('modalTempatTinggal').textContent = tempatTinggal;

    // Show modal
    const resultModal = new bootstrap.Modal(
      document.getElementById('resultModal')
    );
    resultModal.show();
  });
