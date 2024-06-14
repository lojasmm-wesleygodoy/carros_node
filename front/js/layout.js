    // Função para carregar conteúdo do arquivo HTML
    function carregarHTML(url, elemento) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elemento).innerHTML = data;
            });
    }

    // Carregar header e footer
    carregarHTML('header.html', 'header');
    carregarHTML('footer.html', 'footer');