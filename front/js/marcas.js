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
      listItem.classList.add('list-group-item' ,'d-flex' ,'justify-content-between'); 
      
      // Crie um span para o nome da marca
      const marcaNome = document.createElement('span');
      marcaNome.textContent = `${marca.nome}`;
      
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.gap = '10px';
      div.style.marginLeft = '10px';

      // Crie o botão Editar
      const editButton = document.createElement('button');
      editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
      editButton.classList.add('btn', 'btn-primary', 'btn-sm', 'ml-2');
      editButton.addEventListener('click', () => {
        // Função de edição
        editarMarca(marca.id, marca.nome);
      });

      
      // Crie o botão Consultar
      const viewButton = document.createElement('button');
      viewButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
      viewButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'ml-2');
      viewButton.addEventListener('click', () => {
        // Função de consulta
        consultarMarca(marca.id, marca.nome);
      });
      
      // Crie o botão Deletar
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
      deleteButton.addEventListener('click', () => {
        mostrarModalExclusao(marca.id);
      });

      div.appendChild(editButton)
      div.appendChild(viewButton)
      div.appendChild(deleteButton)

      // Adicione os elementos criados ao listItem
      listItem.appendChild(marcaNome);
      listItem.appendChild(div);
      
      // Adicione o listItem à lista
      listaMarcas.appendChild(listItem);
    });

  } catch (error) {
    console.error('Erro ao listar marcas:', error);
  }
}

function editarMarca(id, nome) {
  window.location.href = `editar-marca.html?id=${id}&nome=${encodeURIComponent(nome)}`;
}


function consultarMarca(id, nome) {
  const url = `consultar-marca.html?id=${id}&nome=${encodeURIComponent(nome)}`;
  window.location.href = url;
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
    excluirMarca(id);
    modal.style.display = 'none';
    modal.classList.remove('show');
    document.body.removeChild(modalBackdrop);
  });
}

async function excluirMarca(id) {
  try {
    const response = await fetch(`${baseUrlMarcas}/excluir/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    listarMarcas();
  } catch (error) {
    console.error('Erro ao excluir marca:', error);
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
    window.location.href = "lista-marcas.html" ;
  } catch (error) {
    console.error('Erro ao cadastrar marca:', error);
  }
}
//Evento de listar as marcas
document.addEventListener('DOMContentLoaded', () => {
  listarMarcas();
});

//Tratamento para o evento de criar marca
const form = document.getElementById('form-cadastrar-marca')
if(form){
  document.addEventListener('DOMContentLoaded', () =>{
    form.addEventListener('submit', cadastrarMarca);
  })
}
//Evento para consultar a marca
const marcaDetalhesElement = document.getElementById('marca-detalhes');
if (marcaDetalhesElement) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const nome = decodeURIComponent(params.get('nome'));
  
  if (id && nome) {
    const idItem = document.createElement('li');
    idItem.classList.add('list-group-item');
    idItem.textContent = `Id : ${id}`;
    
    const nomeItem = document.createElement('li');
    nomeItem.classList.add('list-group-item');
    nomeItem.textContent = `Nome : ${nome}`;
    
    marcaDetalhesElement.appendChild(idItem);
    marcaDetalhesElement.appendChild(nomeItem);
  } else {
    const errorItem = document.createElement('li');
    errorItem.classList.add('list-group-item', 'text-danger');
    errorItem.textContent = 'Erro: Parâmetros de ID e Nome não encontrados.';
    marcaDetalhesElement.appendChild(errorItem);
  }
}