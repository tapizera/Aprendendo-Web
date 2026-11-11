// Produtos guardados temporariamente em um vetor (array)
const produtos = [
  { id: 1, 
    nome: "Não Entendo 64", 
    preco: 449.90, 
    categoria: "Consoles", 
    imagem: "img/1.svg", 
    descricao: "Console de mesa com 2.400 jogos clássicos, saída HDMI e dois controles inclusos." 
  },

  { id: 2, 
    nome: "Controle Sem Fio YBOX 380", 
    preco: 189.90, 
    categoria: "Acessórios", 
    imagem: "img/2.svg", 
    descricao: "Controle com bateria de 20 horas, 3 modos de vibração e conexão Bluetooth para PC e celular." 
  },

  { id: 3, 
    nome: "Headset LongeTech Gamer", 
    preco: 259.90, 
    categoria: "Acessórios", 
    imagem: "img/3.svg", 
    descricao: "Som surround virtual, microfone removível e almofadas macias para longas partidas." 
  },

  { id: 4, 
    nome: "Final da Fantasia 7 ", 
    preco: 99.90, categoria: "Jogos", 
    imagem: "img/4.svg", 
    descricao: "Aventura em pixel art com 40 andares, chefes únicos e modo cooperativo local." 
  },

  { id: 5, 
    nome: "Forte Late",
    preco: 229.90, 
    categoria: "Jogos", 
    imagem: "img/5.svg", 
    descricao: "Battle royale online para 100 cães com construção de casinhas, armas de brinquedo e mapa dinâmico." 
  },

  { id: 6, 
    nome: "Teclado Mecânico ReiDragon", 
    preco: 329.90, 
    categoria: "Acessórios", 
    imagem: "img/6.svg", 
    descricao: "Teclado 65% com switches vermelhos, iluminação RGB e cabo destacável." 
  },

  { id: 7, 
    nome: "Frog Ally Z", 
    preco: 899.00, 
    categoria: "Consoles", 
    imagem: "img/7.svg", 
    descricao: "Videogame portátil com tela de 7 polegadas e 8 horas de bateria." 
  },

  { id: 8, 
    nome: "Estrada Vale", 
    preco: 79.90, 
    categoria: "Jogos", 
    imagem: "img/8.svg", 
    descricao: "Aventura rural sobre rodas onde você gerencia uma horta no caminhão, pesca em rios pelo caminho e entrega colheitas frescas de vila em vila." 
  }
];

// Recupera produtos cadastrados durante a visita (só para a demonstração entre páginas)
function carregarExtras() {
  try {
    const salvo = sessionStorage.getItem("extras");
    if (salvo) {
      const lista = JSON.parse(salvo);
      for (let i = 0; i < lista.length; i++) {
        produtos.push(lista[i]);
      }
    }
  } catch (erro) { /* sem armazenamento: segue só com o vetor */ }
}
carregarExtras();

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function criarCard(produto) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.src = produto.imagem;
  img.alt = "Imagem do produto " + produto.nome;
  img.loading = "lazy";

  const corpo = document.createElement("div");
  corpo.className = "corpo";

  const cat = document.createElement("span");
  cat.className = "cat";
  cat.textContent = produto.categoria;

  const titulo = document.createElement("h3");
  titulo.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.className = "preco";
  preco.textContent = formatarPreco(produto.preco);

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "btn";
  botao.textContent = "Ver detalhes";
  botao.addEventListener("click", function () { abrirDetalhes(produto); });

  corpo.append(cat, titulo, preco, botao);
  card.append(img, corpo);
  return card;
}

// Estrutura de repetição (for) para apresentar os produtos
function renderizarProdutos(lista, container) {
  container.innerHTML = "";
  if (lista.length === 0) {
    const aviso = document.createElement("p");
    aviso.className = "vazio";
    aviso.textContent = "Nenhum produto encontrado. Tente outra busca ou categoria.";
    container.appendChild(aviso);
    return;
  }
  for (let i = 0; i < lista.length; i++) {
    container.appendChild(criarCard(lista[i]));
  }
}

function abrirDetalhes(produto) {
  const caixa = document.getElementById("detalhes");
  if (!caixa) return;
  document.getElementById("det-img").src = produto.imagem;
  document.getElementById("det-img").alt = "Imagem do produto " + produto.nome;
  document.getElementById("det-titulo").textContent = produto.nome;
  document.getElementById("det-cat").textContent = "Categoria: " + produto.categoria;
  document.getElementById("det-desc").textContent = produto.descricao;
  document.getElementById("det-preco").textContent = formatarPreco(produto.preco);
  caixa.showModal();
}

function filtrarProdutos() {
  const termo = document.getElementById("busca").value.trim().toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;
  const resultado = [];
  for (let i = 0; i < produtos.length; i++) {
    const p = produtos[i];
    const combinaNome = p.nome.toLowerCase().includes(termo);
    const combinaCategoria = categoria === "todas" || p.categoria === categoria;
    if (combinaNome && combinaCategoria) {
      resultado.push(p);
    }
  }
  renderizarProdutos(resultado, document.getElementById("lista-produtos"));
  document.getElementById("contagem").textContent = resultado.length + " produto(s) encontrado(s)";
}

document.addEventListener("DOMContentLoaded", function () {
  const caixa = document.getElementById("detalhes");
  if (caixa) {
    document.getElementById("det-fechar").addEventListener("click", function () { caixa.close(); });
    caixa.addEventListener("click", function (e) { if (e.target === caixa) caixa.close(); });
  }

  const destaques = document.getElementById("destaques");
  if (destaques) {
    renderizarProdutos(produtos.slice(0, 4), destaques);
  }

  if (document.getElementById("lista-produtos") && document.getElementById("busca")) {
    document.getElementById("busca").addEventListener("input", filtrarProdutos);
    document.getElementById("filtro-categoria").addEventListener("change", filtrarProdutos);
    filtrarProdutos();
  }
});
