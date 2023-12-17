let ideas = [
  {
    id: 1,
    name: "Mood Tracker",
    description: "L'objectif principal de cette application est de permettre à un utilisateur de consigner et de suivre ses émotions quotidiennes à l'aide d'un graphique afin de mieux comprendre son état émotionnel sur une période de temps définie. Attention, l'utilisateur ne peut cliquer sur l'un des boutons qu'une seule fois par jour.",
    utilisation : "Chart.js et Full-calendar"
  },{
    id: 2,
    name: "E-commerce avec système de paiement en ligne et gestion de stock",
    description: "Ce projet vise à créer une boutique en ligne complète où les utilisateurs pourront parcourir différents produits, les ajouter à leur panier, passer des commandes et effectuer des paiements en ligne de manière sécurisée",
    utilisation : "Stripe, Paypal API, etc."
  },{
    id: 3,
    name: "Un simple Réseau social",
    description: "Un réseau social qui permette aux utilisateurs de poster des nouveautés. Chaque utilisateur peut poster un produit ou un article qu'il a découvert et qu'il pense pourrait intéresser la communauté. Chaque utilisateur peut voter pour une publication ainsi que laisser un commentaire. La page d'accueil affiche les publications les plus populaires en premier.",
    utilisation : ""
  },{
    id: 4,
    name: "Création et Utilisation d'une API (ex: météo, film...)",
    description: "Ce projet consiste à créer une API (Interface de Programmation Applicative) qui fournit des données sur un sujet spécifique. Par la suite, cette API sera utilisée pour construire une application ou un site web pour afficher ces données de manière conviviale.",
    utilisation : ""
  },{
    id: 5,
    name: "Un système de gestion de projets (ex: Trello)",
    description: "Un système de gestion de projet en ligne, qui permet aux équipes de collaborer sur des tâches, de suivre leur progression et de communiquer entre elles.",
    utilisation : "Websocket"
  },
  ]

const main = document.querySelector('main');
const addBtn = document.getElementById('addProject')
const formulaireDiv = document.querySelector('.formulaire')
const form = document.querySelector('form')
const cancelBtn = document.querySelector('.cancel')

document.body.addEventListener('click', (e) => {
  console.log(e.target.parentElement)
  if (e.target.className === "fa-solid fa-plus addProject" || e.target.className === "addProject" ){
  formulaireDiv.classList.add('visible')
  addBtn.classList.add('hidden')
  } else if (e.target.className === "cancel") {
    form.reset()
    formulaireDiv.classList.remove('visible')
    addBtn.classList.remove('hidden')

  } 
})

const addProject = () => {
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const utilisationInput = document.getElementById('utilisation')

  const name = nameInput.value;
  const description = descriptionInput.value;
  const utilisation = utilisationInput.value;

  const newProject = {
    id: ideas.length + 1,
    name: name,
    description: description,
    utilisation: utilisation
  }

  ideas.push(newProject)
  renderProject()
  saveLocal()
  form.reset()
  formulaireDiv.classList.remove('visible')
}

const renderProject = () => {
  main.innerHTML = '';
  for (const idea of ideas) {
    main.innerHTML += `
    <article>
    <div class="articleClear">
        <input type="checkbox" name="project" id="project">
        <label>${idea.name}</label>
        <span class="trash" data-id="${idea.id}"><i class="fa-regular fa-trash-can"></i></span>
      </div>
      <div class="articleDetail">
        <p><span>Description :</span> ${idea.description}</p>
        <p><span>Utile :</span> ${idea.utilisation}</p>
      </div>
    </article>
    `
  }
}

const saveLocal = () => {
  localStorage.setItem('ideas', JSON.stringify(ideas))
}

const getLocal = () => {
  const ideasLocal = JSON.parse(localStorage.getItem("ideas"));
  if (ideasLocal) {
    ideas = ideasLocal;
  }
};

main.addEventListener('click', (e) => {
  if (e.target.className === 'trash') {
    const id = parseInt(e.target.dataset.id);
    deleteProject(id);
  }
});

const deleteProject = (id) => {
  const index = ideas.findIndex((idea) => idea.id === id);
  if (index !== -1) {
    ideas.splice(index, 1);
    renderProject();
    saveLocal();
  }
};

getLocal()
renderProject()
