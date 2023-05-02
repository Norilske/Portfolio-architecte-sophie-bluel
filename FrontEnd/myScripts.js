const triTous = document.getElementById("tri-tous");
const triObjet = document.getElementById("tri-objet");
const triAppartement = document.getElementById("tri-appartement");
const triHotel = document.getElementById("tri-hotel");


// Récupérer l'élément HTML de la liste de projets
const projetsListe = document.getElementById("projets-liste");

// Récupérer les données des catégories et des travaux depuis l'API
const categoriesPromise = fetch('http://localhost:5678/api/categories').then(response => response.json());
const worksPromise = fetch('http://localhost:5678/api/works').then(response => response.json());

// Définir une fonction pour trier les travaux par catégorie
async function trierParCategorie(categorie) {
  // Attendre les données des catégories et des travaux depuis l'API
  const [categories, works] = await Promise.all([categoriesPromise, worksPromise]);
console.log(categories);
  // Récupérer la catégorie sélectionnée
  const categorieSelectionnee = categories.find(cat => cat.name === categorie);

  // Filtrer les travaux selon la catégorie sélectionnée
  const projetsFiltres = categorieSelectionnee
    ? works.filter(travail => travail.categoryId === categorieSelectionnee.id)
    : works;

  // Mettre à jour la liste de projets HTML avec les travaux filtrés
  const projetsNode = document.querySelector('#projets-photos');
  projetsNode.innerHTML = projetsFiltres.map(travail => `
    <div class="work">
      <img src="${travail.imageUrl}" alt="${travail.title}">
      <p>${travail.title}</p>
    </div>
  `).join('');
}

// Afficher tous les travaux au chargement de la page
window.addEventListener("load", async () => {
  const works = await worksPromise;
  const projetsNode = document.querySelector('#projets-photos');
  projetsNode.innerHTML = works.map(travail => `
    <div class="work">
      <img src="${travail.imageUrl}" alt="${travail.title}">
      <p>${travail.title}</p>
    </div>
  `).join('');
});

// Vérifier si les boutons de tri existent avant d'ajouter les événements de clic
if (triTous && triObjet && triAppartement && triHotel) {
  triTous.addEventListener("click", () => trierParCategorie("Tous"));
  triObjet.addEventListener("click", () => trierParCategorie("Objets"));
  triAppartement.addEventListener("click", () => trierParCategorie("Appartements"));
  triHotel.addEventListener("click", () => trierParCategorie("Hotels & restaurants"));
}


