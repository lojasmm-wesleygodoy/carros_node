async function consultaMarcas(){
    await fetch('http://localhost:3000/api/v1/marca/listar-todas', 
        {
            method: 'GET'
        }
    )
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

async function cadastrarMarca(params) {
    await fetch('http://localhost:3000/api/v1/marca/criar',
        {
            method: 'POST',
            params
        }
    ).then(response =>{
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}
