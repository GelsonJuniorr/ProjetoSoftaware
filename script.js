// Catálogo inicial com dados fictícios da Mora Beauty
const catalogo = {
  gloss: { nome: "Gloss Labial Rosa", preco: 19.90, estoque: 10 }, // Já inicia refletindo o Pedido #0001 (12 -> 10)
  batom: { nome: "Batom Matte Vinho", preco: 29.90, estoque: 15 },
  blush: { nome: "Blush Cremoso Pêssego", preco: 34.90, estoque: 8 }
};

let contadorPedidos = 1;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarNumeroPedido(num) {
  return "#" + String(num).padStart(4, "0");
}

function esconderAlertas() {
  document.getElementById("alert-error").classList.add("hidden");
}

function alternarTela(telaId, titulo) {
  esconderAlertas();
  document.getElementById("screen-form").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-menu").classList.add("hidden");

  document.getElementById(telaId).classList.remove("hidden");
  document.getElementById("page-title").textContent = titulo;
}

function abrirNovoPedido() {
  alternarTela("screen-form", "Pedidos — Novo Registro");
  atualizarInfoProduto();
}

function voltarAoMenu() {
  document.getElementById("menu-last-id").textContent = String(contadorPedidos).padStart(4, "0");
  alternarTela("screen-menu", "Início");
}

function verUltimoResultado() {
  alternarTela("screen-result", "Pedidos");
}

function mostrarAvisoModulo(modulo) {
  alert(`Módulo "${modulo}" disponível na versão completa do sistema Mora Beauty.`);
}

function atualizarInfoProduto() {
  const chave = document.getElementById("produto").value;
  const qtd = parseInt(document.getElementById("quantidade").value, 10) || 0;
  const item = catalogo[chave];

  document.getElementById("estoque-hint").textContent =
    `Disponível em estoque: ${item.estoque} unidades`;
  document.getElementById("subtotal-preview").textContent =
    formatarMoeda(item.preco * Math.max(qtd, 0));
}

document.getElementById("quantidade").addEventListener("input", atualizarInfoProduto);

document.getElementById("order-form").addEventListener("submit", function (evento) {
  evento.preventDefault();
  esconderAlertas();

  const cliente = document.getElementById("cliente").value.trim() || "Cliente Demonstração";
  const chave = document.getElementById("produto").value;
  const quantidade = parseInt(document.getElementById("quantidade").value, 10);
  const item = catalogo[chave];

  // Validação de entrada e falta de estoque (Fluxo de Exceção)
  if (!quantidade || quantidade <= 0) {
    exibirErro("Informe uma quantidade válida (mínimo 1 unidade) para continuar.");
    return;
  }

  if (quantidade > item.estoque) {
    exibirErro(
      `Estoque insuficiente para "${item.nome}". Disponível: ${item.estoque} unidades. Corrija a quantidade abaixo.`
    );
    return;
  }

  // Processamento do pedido e atualização do estoque
  contadorPedidos += 1;
  const estoqueAnterior = item.estoque;
  item.estoque -= quantidade;
  const subtotal = item.preco * quantidade;

  // Preenchimento da Tela 3
  document.getElementById("res-numero").textContent = formatarNumeroPedido(contadorPedidos);
  document.getElementById("res-cliente").textContent = cliente;
  document.getElementById("res-produto").textContent = item.nome;
  document.getElementById("res-quantidade").textContent =
    `${quantidade} ${quantidade === 1 ? "unidade" : "unidades"}`;
  document.getElementById("res-unitario").textContent = formatarMoeda(item.preco);
  document.getElementById("res-subtotal").textContent = formatarMoeda(subtotal);

  document.getElementById("res-stock-produto").textContent = item.nome;
  document.getElementById("res-stock-atual").textContent = item.estoque;
  document.getElementById("res-stock-anterior").textContent =
    `(Anterior: ${estoqueAnterior} unidades)`;

  alternarTela("screen-result", "Pedidos");
});

function exibirErro(mensagem) {
  const alerta = document.getElementById("alert-error");
  document.getElementById("alert-error-text").textContent = mensagem;
  alerta.classList.remove("hidden");
  alerta.focus();
}
