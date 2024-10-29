let livros = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarLivros();
});

async function carregarLivros() {
    const response = await fetch('livros.json');
    livros = await response.json();
    exibirLivros();
}

function exibirLivros(filtro = "") {
    const lista = document.getElementById('lista-livros');
    lista.innerHTML = "";

    const livrosFiltrados = filtro 
        ? livros.filter(livro => livro.titulo.includes(filtro) || livro.autor.includes(filtro) || livro.genero.includes(filtro)) 
        : livros;

    livrosFiltrados.forEach(livro => {
        const divLivro = document.createElement('div');
        divLivro.classList.add('livro');
        divLivro.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Gênero:</strong> ${livro.genero}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <p><strong>Avaliação:</strong> ${livro.avaliacao}</p>
            <button onclick="avaliarLivro(${livro.id})">Avaliar</button>
            <button onclick="removerLivro(${livro.id})">Remover</button>
        `;
        lista.appendChild(divLivro);
    });
}

function buscarLivro() {
    const filtro = document.getElementById('buscar').value;
    exibirLivros(filtro);
}

function adicionarLivro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const ano = parseInt(document.getElementById('ano').value, 10);
    
    const novoLivro = {
        id: livros.length + 1,
        titulo,
        autor,
        genero,
        ano,
        avaliacao: 0
    };

    livros.push(novoLivro);
    exibirLivros();
    salvarLivros();
}

function avaliarLivro(id) {
    const avaliacao = prompt("Dê uma nota de 1 a 5 para este livro:");
    const livro = livros.find(livro => livro.id === id);
    if (livro) {
        livro.avaliacao = parseFloat(avaliacao);
        exibirLivros();
        salvarLivros();
    }
}

function removerLivro(id) {
    livros = livros.filter(livro => livro.id !== id);
    exibirLivros();
    salvarLivros();
}

async function salvarLivros() {
    try {
        await fetch('livros.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livros)
        });
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}
