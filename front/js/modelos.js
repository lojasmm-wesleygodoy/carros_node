const baseUrlModelos = "http://localhost:3000/api/v1/modelo";
const baseUrlMarcas = "http://localhost:3000/api/v1/marca";

async function listarModelos() {
    try {
      const response = await fetch(`${baseUrlModelos}/listar-todos`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Verifica se o elemento onde a lista de modelos será inserida existe
      const listaModelos = document.getElementById('lista-modelos');
      if (!listaModelos) {
        throw new Error("Elemento 'lista-modelos' não encontrado no DOM.");
      }
  
      // Limpa a lista antes de adicionar novos itens
      listaModelos.innerHTML = '';
  
      // Itera sobre o array de modelos e adiciona cada um à lista
      for (const modelo of data.modelo) {
        const marcaResponse = await fetch(`${baseUrlMarcas}/consultar/${modelo.id_marca}`);
        const marcaData = await marcaResponse.json();
        const marcaNome = marcaData.marca ? marcaData.marca[0].nome : 'Marca não encontrada';
  
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
  
        const modeloNome = document.createElement('span');
        const modeloAno = document.createElement('span');
        const modeloCor = document.createElement('span');
        const modeloMarca = document.createElement('span');
        modeloNome.style.marginLeft = '10px';
        modeloAno.style.marginLeft = '10px';
        modeloCor.style.marginLeft = '10px';
        modeloMarca.style.marginLeft = '10px';
        modeloNome.textContent = `Nome : ${modelo.nome} `;
        modeloAno.textContent = ` Ano : ${modelo.ano}`;
        modeloCor.textContent = ` Cor : ${modelo.cor}`;
        modeloMarca.textContent = ` Marca : ${marcaNome}`;
  
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.gap = '10px';
        div.style.marginLeft = '20px';
  
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        editButton.classList.add('btn', 'btn-primary', 'btn-sm', 'ml-2');
        editButton.addEventListener('click', () => {
          editarModelo(modelo); // Passa o modelo como parâmetro
        });
  
        const viewButton = document.createElement('button');
        viewButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
        viewButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'ml-2');
        viewButton.addEventListener('click', () => {
          consultarModelo(modelo);
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        deleteButton.addEventListener('click', () => {
          mostrarModalExclusao(modelo.id);
        });
  
        div.appendChild(editButton);
        div.appendChild(viewButton);
        div.appendChild(deleteButton);
  
        listItem.appendChild(modeloNome);
        listItem.appendChild(modeloAno);
        listItem.appendChild(modeloCor);
        listItem.appendChild(modeloMarca);
        listItem.appendChild(div);
  
        listaModelos.appendChild(listItem);
      }
    } catch (error) {
      console.error('Erro ao listar modelos:', error);
    }
  }
  
  function editarModelo(modelo) {
    localStorage.setItem('modeloParaEditar', JSON.stringify(modelo));
    window.location.href = 'editar-modelo.html';
  }
  
document.addEventListener('DOMContentLoaded', async () => {
    const modelo = JSON.parse(localStorage.getItem('modeloParaEditar'));
  
    if (modelo) {
      document.getElementById('id-modelo').value = modelo.id;
      document.getElementById('nome-modelo').value = modelo.nome;
      document.getElementById('ano-modelo').value = modelo.ano;
      document.getElementById('cor-modelo').value = modelo.cor;
  
      // Consultar a marca associada ao modelo
      try {
        const marcaResponse = await fetch(`${baseUrlMarcas}/consultar/${modelo.id_marca}`);
        if (!marcaResponse.ok) {
          throw new Error(`HTTP error! Status: ${marcaResponse.status}`);
        }
        const marcaData = await marcaResponse.json();
        const marcaNome = marcaData.marca ? marcaData.marca[0].nome : 'Marca não encontrada';
        document.getElementById('marca-modelo').value = marcaNome;
        document.getElementById('id-marca').value = modelo.id_marca;
      } catch (error) {
        console.error('Erro ao consultar marca:', error);
      }
  
      document.getElementById('form-editar-modelo').addEventListener('submit', async (event) => {
        event.preventDefault();
        const novoNome = document.getElementById('nome-modelo').value;
        const novoAno = document.getElementById('ano-modelo').value;
        const novaCor = document.getElementById('cor-modelo').value;
        const idMarca = document.getElementById('id-marca').value;
  
        try {
          const response = await fetch(`${baseUrlModelos}/atualizar`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: modelo.id, nome: novoNome, ano: novoAno, cor: novaCor, id_marca: idMarca })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          window.location.href = 'lista-modelos.html';
        } catch (error) {
          console.error('Erro ao atualizar modelo:', error);
        }
      });
    }
  });
  

function consultarModelo(modelo) {
  localStorage.setItem('modeloParaConsultar', JSON.stringify(modelo));
  window.location.href = 'consultar-modelo.html';
}

function mostrarModalExclusao(id) {
  const modal = document.getElementById('confirmarExclusaoModal');
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop fade show';
  document.body.appendChild(modalBackdrop);

  modal.style.display = 'block';
  modal.classList.add('show');

  const confirmarExclusaoBtn = document.getElementById('confirmarExclusaoBtn');
  confirmarExclusaoBtn.addEventListener('click', () => {
    excluirModelo(id);
    modal.style.display = 'none';
    modal.classList.remove('show');
    document.body.removeChild(modalBackdrop);
  });
}

async function excluirModelo(id) {
  try {
    const response = await fetch(`${baseUrlModelos}/excluir/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    listarModelos();
  } catch (error) {
    console.error('Erro ao excluir modelo:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Carregar opções de marcas no <select>
    try {
      const response = await fetch(`${baseUrlMarcas}/listar-todas`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const selectMarca = document.getElementById('id-marca');
      
      data.marca.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca.id;
        option.textContent = marca.nome;
        selectMarca.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  
    document.getElementById('form-cadastrar-modelo').addEventListener('submit', async (event) => {
      event.preventDefault();
      const nomeModelo = document.getElementById('nome-modelo').value;
      const anoModelo = document.getElementById('ano-modelo').value;
      const corModelo = document.getElementById('cor-modelo').value;
      const idMarca = document.getElementById('id-marca').value;
  
      try {
        const response = await fetch(`${baseUrlModelos}/criar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome: nomeModelo, ano: anoModelo, cor: corModelo, id_marca: idMarca })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Após cadastrar, redirecionar para a lista de modelos
        window.location.href = "lista-modelos.html";
      } catch (error) {
        console.error('Erro ao cadastrar modelo:', error);
      }
    });
  });
  
  

document.addEventListener('DOMContentLoaded', () => {
  listarModelos();
});

const form = document.getElementById('form-cadastrar-modelo');
if (form) {
  document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', cadastrarModelo);
  });
}

async function carregarModeloDetalhes() {
  const modeloDetalhesElement = document.getElementById('modelo-detalhes');
  if (modeloDetalhesElement) {
    const modelo = JSON.parse(localStorage.getItem('modeloParaConsultar'));

    if (modelo) {
      const marcaResponse = await fetch(`${baseUrlMarcas}/consultar/${modelo.id_marca}`);
      const marcaData = await marcaResponse.json();
      const marcaNome = marcaData.marca ? marcaData.marca[0].nome : 'Marca não encontrada';

      const idItem = document.createElement('li');
      idItem.classList.add('list-group-item');
      idItem.textContent = `Id : ${modelo.id}`;

      const nomeItem = document.createElement('li');
      nomeItem.classList.add('list-group-item');
      nomeItem.textContent = `Nome : ${modelo.nome}`;

      const anoItem = document.createElement('li');
      anoItem.classList.add('list-group-item');
      anoItem.textContent = `Ano : ${modelo.ano}`;

      const corItem = document.createElement('li');
      corItem.classList.add('list-group-item');
      corItem.textContent = `Cor : ${modelo.cor}`;

      const marcaItem = document.createElement('li');
      marcaItem.classList.add('list-group-item');
      marcaItem.textContent = `Marca : ${marcaNome}`;

      modeloDetalhesElement.appendChild(idItem);
      modeloDetalhesElement.appendChild(nomeItem);
      modeloDetalhesElement.appendChild(anoItem);
      modeloDetalhesElement.appendChild(corItem);
      modeloDetalhesElement.appendChild(marcaItem);
    } else {
      const errorItem = document.createElement('li');
      errorItem.classList.add('list-group-item', 'text-danger');
      errorItem.textContent = 'Erro: Parâmetros de modelo não encontrados.';
      modeloDetalhesElement.appendChild(errorItem);
    }
  }
}

document.addEventListener('DOMContentLoaded', carregarModeloDetalhes);

document.addEventListener('DOMContentLoaded', async () => {
  const modelo = JSON.parse(localStorage.getItem('modeloParaEditar'));

  if (modelo) {
    document.getElementById('id-modelo').value = modelo.id;
    document.getElementById('nome-modelo').value = modelo.nome;
    document.getElementById('ano-modelo').value = modelo.ano;
    document.getElementById('cor-modelo').value = modelo.cor;
    document.getElementById('id-marca').value = modelo.id_marca;

    document.getElementById('form-editar-modelo').addEventListener('submit', async (event) => {
      event.preventDefault();
      const novoNome = document.getElementById('nome-modelo').value;
      const novoAno = document.getElementById('ano-modelo').value;
      const novaCor = document.getElementById('cor-modelo').value;
      const novoIdMarca = document.getElementById('id-marca').value;

      try {
        const response = await fetch(`${baseUrlModelos}/atualizar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: modelo.id, nome: novoNome, ano: novoAno, cor: novaCor, id_marca: novoIdMarca })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        window.location.href = 'lista-modelos.html';
      } catch (error) {
        console.error('Erro ao atualizar modelo:', error);
      }
    });
  }
});
