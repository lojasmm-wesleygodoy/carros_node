const baseUrlMarcas = "http://localhost:3000/api/v1/marca";

async function listarMarcas() {
  try {
    const response = await fetch(`${baseUrlMarcas}/listar-todas`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    // Encontre o elemento UL no HTML onde a lista será inserida
    const listaMarcas = document.getElementById('lista-marcas');
    
    // Limpe a lista antes de adicionar novos itens (opcional, dependendo do uso)
    listaMarcas.innerHTML = '';

    // Itere sobre o array de marcas e adicione cada uma à lista
    data.marca.forEach(marca => {
      const listItem = document.createElement('li');
      listItem.textContent = marca.nome; // Supondo que 'nome' seja uma propriedade do objeto marca
      listaMarcas.appendChild(listItem);
    });
  } catch (error) {
    console.error('Erro ao listar marcas:', error);
  }
}

async function cadastrarMarca(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  const nomeMarca = document.getElementById('nome-marca').value;

  try {
    const response = await fetch(`${baseUrlMarcas}/criar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: nomeMarca })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Após cadastrar, listar as marcas novamente para atualizar a lista
    listarMarcas();
  } catch (error) {
    console.error('Erro ao cadastrar marca:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  listarMarcas();
  document.getElementById('form-cadastrar-marca').addEventListener('submit', cadastrarMarca);
});
