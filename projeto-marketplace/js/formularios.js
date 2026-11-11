// Validação em JavaScript (cadastro de produto e contato)

function mostrarErros(caixa, erros) {
  caixa.innerHTML = "";
  const titulo = document.createElement("strong");
  titulo.textContent = "Corrija os itens abaixo:";
  const lista = document.createElement("ul");
  for (let i = 0; i < erros.length; i++) {
    const item = document.createElement("li");
    item.textContent = erros[i];
    lista.appendChild(item);
  }
  caixa.append(titulo, lista);
  caixa.hidden = false;
}

// ---------- Cadastro de produto ----------
const formProduto = document.getElementById("form-produto");
if (formProduto) {
  const caixaErros = document.getElementById("erros-produto");
  const caixaOk = document.getElementById("ok-produto");
  const listaCadastro = document.getElementById("lista-cadastrados");
  renderizarProdutos(produtos, listaCadastro);

  formProduto.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const categoria = document.getElementById("categoria").value;
    const imagem = document.getElementById("imagem").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const erros = [];

    if (nome.length < 3) {
      erros.push("O nome precisa ter pelo menos 3 caracteres.");
    } else {
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome.toLowerCase() === nome.toLowerCase()) {
          erros.push("Já existe um produto com esse nome.");
          break;
        }
      }
    }
    if (isNaN(preco) || preco <= 0) {
      erros.push("Informe um preço maior que zero.");
    } else if (preco > 50000) {
      erros.push("O preço máximo permitido é R$ 50.000,00.");
    }
    if (categoria === "") {
      erros.push("Escolha uma categoria.");
    }
    if (imagem !== "" && !imagem.startsWith("http")) {
      erros.push("O endereço da imagem deve começar com http.");
    }
    if (descricao.length < 10) {
      erros.push("A descrição precisa ter pelo menos 10 caracteres.");
    }

    if (erros.length > 0) {
      caixaOk.hidden = true;
      mostrarErros(caixaErros, erros);
      return;
    }

    const novo = {
      id: Date.now(),
      nome: nome,
      preco: preco,
      categoria: categoria,
      imagem: imagem !== "" ? imagem : "img/novo.svg",
      descricao: descricao
    };
    produtos.push(novo);

    try {
      const salvo = JSON.parse(sessionStorage.getItem("extras") || "[]");
      salvo.push(novo);
      sessionStorage.setItem("extras", JSON.stringify(salvo));
    } catch (erro) { /* sem armazenamento: o vetor continua valendo nesta página */ }

    caixaErros.hidden = true;
    caixaOk.textContent = "Produto \"" + nome + "\" cadastrado! Veja na lista abaixo ou na página Produtos.";
    caixaOk.hidden = false;
    formProduto.reset();
    renderizarProdutos(produtos, listaCadastro);
  });
}

// ---------- Contato ----------
const formContato = document.getElementById("form-contato");
if (formContato) {
  const caixaErros = document.getElementById("erros-contato");
  const caixaOk = document.getElementById("ok-contato");

  formContato.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("c-nome").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const assunto = document.getElementById("c-assunto").value;
    const mensagem = document.getElementById("c-mensagem").value.trim();
    const erros = [];

    if (nome.length < 3) erros.push("Digite seu nome completo.");
    if (!email.includes("@") || !email.includes(".")) erros.push("Digite um e-mail válido.");
    if (assunto === "") erros.push("Escolha um assunto.");
    if (mensagem.length < 10) erros.push("A mensagem precisa ter pelo menos 10 caracteres.");

    if (erros.length > 0) {
      caixaOk.hidden = true;
      mostrarErros(caixaErros, erros);
      return;
    }
    caixaErros.hidden = true;
    caixaOk.textContent = "Obrigado, " + nome.split(" ")[0] + "! Recebemos sua mensagem e vamos responder em até 2 dias úteis.";
    caixaOk.hidden = false;
    formContato.reset();
  });
}
