document.getElementById('lookupBtn').addEventListener('click', async () => {
    const postcode = document.getElementById('postcodeInput').value.trim();
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = 'Looking up...';
  
    try {
      const response = await fetch(`/.netlify/functions/getPostcode?postcode=${encodeURIComponent(postcode)}`);
      const data = await response.json();
  
      if (response.ok && data.status === 200) {
        const info = data.result;
        resultBox.textContent = `
  Postcode: ${info.postcode}
  Region: ${info.region}
  Country: ${info.country}
  District: ${info.admin_district}
  Parish: ${info.parish}
  Latitude: ${info.latitude}
  Longitude: ${info.longitude}
        `;
      } else {
        resultBox.textContent = `❌ ${data.error || 'Invalid postcode'}`;
      }
    } catch (error) {
      resultBox.textContent = '❌ Error: ' + error.message;
    }
  });
  