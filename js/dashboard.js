const dataDiv = document.getElementById("countryData");
const statusText = document.getElementById("status");
const refreshBtn = document.getElementById("refreshBtn");

async function fetchCountries() {
  dataDiv.innerHTML = "";
  statusText.textContent = "Loading data...";

  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();
    statusText.textContent = "";

    data.slice(0, 5).forEach(country => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h4>${country.name.common}</h4>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
      `;
      dataDiv.appendChild(card);
    });

  } catch (error) {
    statusText.textContent = "Error fetching country data";
  }
}

refreshBtn.addEventListener("click", fetchCountries);
fetchCountries();