const sheetURL = 'INSERISCI_IL_TUO_LINK_WEB_APP_GOOGLE_SHEETS';

async function loadScores() {
  const res = await fetch(sheetURL);
  const data = await res.json();

  const header = data[0];
  const rows = data.slice(1);

  let totals = Array(header.length - 1).fill(0);
  rows.forEach(row => {
    for (let i = 1; i < row.length; i++) totals[i-1] += Number(row[i]);
  });

  let html = '<h2>Punti Totali</h2><ul>';
  for (let i = 1; i < header.length; i++) {
    html += `<li>${header[i]}: ${totals[i-1]}</li>`;
  }
  html += '</ul>';

  document.getElementById('totali').innerHTML = html;
}

async function submitPoints() {
  const data = {
    data: document.getElementById('date').value,
    Leo: Number(document.getElementById('leo').value),
    Andrea: Number(document.getElementById('andrea').value),
    Aldo: Number(document.getElementById('aldo').value)
  };

  await fetch(sheetURL, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  loadScores(); // aggiorna subito i totali
}

loadScores();
