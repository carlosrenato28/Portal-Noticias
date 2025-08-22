// Dados de login fixos (exemplo)
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

let loggedIn = false;

// Elementos
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginSubmit = document.getElementById("loginSubmit");
const adminPanel = document.getElementById("adminPanel");
const newsForm = document.getElementById("newsForm");
const newsList = document.getElementById("newsList");

// Abrir modal de login
loginBtn.onclick = () => loginModal.style.display = "block";
// Fechar modal
closeModal.onclick = () => loginModal.style.display = "none";

// Login
loginSubmit.onclick = () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user === ADMIN_USER && pass === ADMIN_PASS){
    loggedIn = true;
    loginModal.style.display = "none";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    adminPanel.style.display = "block";
    loadNews();
  } else {
    alert("Usuário ou senha inválidos!");
  }
};

// Logout
logoutBtn.onclick = () => {
  loggedIn = false;
  loginBtn.style.display = "inline";
  logoutBtn.style.display = "none";
  adminPanel.style.display = "none";
  loadNews();
};

// Carregar notícias do localStorage
function loadNews(){
  newsList.innerHTML = "";
  let news = JSON.parse(localStorage.getItem("news")) || [];
  news.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "news";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
      ${loggedIn ? `
        <button class="deleteBtn" onclick="deleteNews(${index})">Excluir</button>
        <button class="editBtn" onclick="editNews(${index})">Editar</button>
      ` : ""}
    `;
    newsList.appendChild(div);
  });
}

// Adicionar ou editar notícia
newsForm.onsubmit = (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let editIndex = document.getElementById("editIndex").value;

  let news = JSON.parse(localStorage.getItem("news")) || [];

  if(editIndex === "") {
    // Nova notícia
    news.push({title, content});
  } else {
    // Editar notícia existente
    news[editIndex] = {title, content};
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("news", JSON.stringify(news));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  loadNews();
};

// Excluir notícia
function deleteNews(index){
  let news = JSON.parse(localStorage.getItem("news")) || [];
  news.splice(index, 1);
  localStorage.setItem("news", JSON.stringify(news));
  loadNews();
}

// Editar notícia
function editNews(index){
  let news = JSON.parse(localStorage.getItem("news")) || [];
  document.getElementById("title").value = news[index].title;
  document.getElementById("content").value = news[index].content;
  document.getElementById("editIndex").value = index;
}

// Inicializar
loadNews();
