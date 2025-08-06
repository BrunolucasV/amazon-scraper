document.getElementById("searchBtn").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!keyword) {
    alert("Por favor, digite uma palavra-chave.");
    return;
  }

  resultsDiv.innerHTML = "<p>Buscando produtos...</p>";

  try {
    const res = await fetch(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (data.error) {
      resultsDiv.innerHTML = `<p>Erro: ${data.error}</p>`;
      return;
    }

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    resultsDiv.innerHTML = "";

    data.forEach((product) => {
      resultsDiv.innerHTML += `
        <div class="product">
          <img src="${product.image}" alt="Imagem do produto">
          <h3>${product.title}</h3>
          <p>⭐ ${product.rating || "Sem avaliação"}</p>
          <p>${product.reviews || "Sem comentários"}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Erro ao buscar os dados. Verifique se o backend está rodando.</p>";
  }
});