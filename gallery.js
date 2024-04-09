// Selecionando elementos do DOM
const inputFile = document.getElementById('inputFile');
const btnAdd = document.getElementById('btnAdd');
const gallery = document.getElementById('gallery');
const fileNameDisplay = document.getElementById('fileName');

// Adicionando evento de clique ao botão Adicionar
btnAdd.addEventListener('click', () => {
    // Verificando se um arquivo foi selecionado
    if (inputFile.files.length > 0) {
        const file = inputFile.files[0];
        const reader = new FileReader();

        // Lendo o arquivo como URL de dados
        reader.readAsDataURL(file);
        
        reader.onload = function () {
            // Criando elemento img para exibir a imagem
            const img = document.createElement('img');
            img.src = reader.result;
            
            // Adicionando a imagem à galeria
            gallery.appendChild(img);

            // Salvando a imagem no localStorage
            saveImageToLocalStorage(reader.result);
        };

        // Atualizando o nome do arquivo exibido
        fileNameDisplay.textContent = file.name;
    }
});

// Função para salvar a imagem no localStorage
function saveImageToLocalStorage(imageData) {
    // Verificando se já há imagens armazenadas
    const storedImages = JSON.parse(localStorage.getItem('images')) || [];

    // Adicionando a nova imagem ao array
    storedImages.push(imageData);

    // Salvando o array atualizado no localStorage
    localStorage.setItem('images', JSON.stringify(storedImages));
}

// Carregando imagens do localStorage ao carregar a página
window.onload = function () {
    const storedImages = JSON.parse(localStorage.getItem('images')) || [];

    storedImages.forEach(imageData => {
        const img = document.createElement('img');
        img.src = imageData;
        gallery.appendChild(img);
    });
};

// Removendo imagens ao clicar nelas
gallery.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        event.target.remove();

        // Atualizando o localStorage após a remoção
        updateLocalStorage();
    }
});

// Função para atualizar o localStorage após a remoção de uma imagem
function updateLocalStorage() {
    const images = [];
    gallery.querySelectorAll('img').forEach(img => {
        images.push(img.src);
    });

    // Salvando a lista atualizada de imagens no localStorage
    localStorage.setItem('images', JSON.stringify(images));
}
