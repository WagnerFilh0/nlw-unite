// Criando uma variável armazenando um array, com os objetos (participantes)
let participantes = [
  {
    nome: "Wagner Filho",
    email: "wagnerfilho@gmail.com",
    //Data: ano, mês, dia, hora, minuto
    //O mês é contado de 0 - Janeiro, 1 - Fevereiro, ...
    dataInscricao: new Date(2024, 2, 28, 15, 30),
    dataCheckIn: new Date(2024, 3, 1, 22, 17),
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 8, 0),
    dataCheckIn: null,
  },
  {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    dataInscricao: new Date(2024, 2, 29, 14, 20),
    dataCheckIn: new Date(2024, 3, 2, 10, 5),
  },
  {
    nome: "João Pereira",
    email: "joao.pereira@example.com",
    dataInscricao: new Date(2024, 2, 25, 10, 45),
    dataCheckIn: null,
  },
  {
    nome: "Ana Souza",
    email: "ana.souza@example.com",
    dataInscricao: new Date(2024, 2, 26, 16, 10),
    dataCheckIn: new Date(2024, 3, 3, 13, 20),
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 27, 11, 55),
    dataCheckIn: new Date(2024, 3, 4, 8, 45),
  },
  {
    nome: "Juliana Santos",
    email: "juliana.santos@example.com",
    dataInscricao: new Date(2024, 2, 24, 13, 30),
    dataCheckIn: new Date(2024, 3, 5, 12, 15),
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 23, 9, 15),
    dataCheckIn: null,
  },
  {
    nome: "Carla Martins",
    email: "carla.martins@example.com",
    dataInscricao: new Date(2024, 2, 26, 14, 0),
    dataCheckIn: new Date(2024, 3, 7, 14, 30),
  },
  {
    nome: "Rafael Almeida",
    email: "rafael.almeida@example.com",
    dataInscricao: new Date(2024, 2, 22, 17, 40),
    dataCheckIn: new Date(2024, 3, 8, 16, 20),
  },
];

// Função que cria um novo participante e retorna os dados em html
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  // Estrutura condicional
  // Substitui a data de Checkin nula por um botão para confirmar a inscrição
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
    data-email= "${participante.email}"
    onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `;
  }

  // Utilizar a crase com o return para manter a estrutura HTML sem precisar da quebra de linha
  return `
    <tr>
      <td>
        <strong> 
            ${participante.nome} 
        </strong>
        <br />
        <small> 
            ${participante.email} 
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `;
};

// Função que atualiza e exibe a lista de participantes
const atualizarLista = (participantes) => {
  let output = "";
  //estrutura de repetição - loop
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  //substituir informação HTML
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

//Função do butão do form - Adiciona um novo participante
const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosFormulario = new FormData(event.target);

  const participante = {
    nome: dadosFormulario.get("nome"),
    email: dadosFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  // Verificar se o participante ja existe
  const participanteExite = participantes.find(
    (p) => p.email == participante.email // Funções arrow curtas(com retorno imediato), podem ser escritas dessa forma
  );
  if (participanteExite) {
    alert("Email já Cadastrado!");
    return;
  }

  // '...' é p conceito de spread no js, ele pega as informações anteriores e adiciona(espalha) no resto da lista
  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  // Limpar o formulário
  // querySelector - Para selecionar o HTML
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

// Função para realizar o Check-in
const fazerCheckIn = (event) => {
  // Confirmação do Check-in

  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  // Encontrar o participante na lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  );

  // Atualizar o check-in do participante
  participante.dataCheckIn = new Date();

  // Atualizar a lista de participantes
  atualizarLista(participantes);
};
