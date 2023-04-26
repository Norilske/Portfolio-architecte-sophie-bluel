// Sélection des éléments HTML
const projetsNode = document.querySelector('#projets');
const tousButton = document.querySelector('#tri-tous');
const objetButton = document.querySelector('#tri-objet');
const appartementButton = document.querySelector('#tri-appartement');
const hotelButton = document.querySelector('#tri-hôtel');

// Récupération des données depuis l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Fonction pour trier les éléments en fonction de l'identifiant du bouton de tri sélectionné
    const trierParCategorie = categorie => {
      let categoriesHTML = '';

      // Filtrage des éléments en fonction de la catégorie sélectionnée
      const filteredData = categorie === 'tous' ? data : data.filter(({ name }) => name.toLowerCase().includes(categorie));

      // Tri des éléments en fonction de leur name
      filteredData.sort((a, b) => a.name.localeCompare(b.name));

      // Génération du contenu HTML trié
      for (const { name } of filteredData) {
        categoriesHTML += `
          <div class="category">
            <p>${name}</p>
          </div>
        `;
      }

      // Mise à jour du contenu HTML affiché
      projetsNode.innerHTML = categoriesHTML;
    };

    // Écouteurs d'événements pour les boutons de tri
    tousButton.addEventListener('click', () => trierParCategorie('tous'));
    objetButton.addEventListener('click', () => trierParCategorie('objet'));
    appartementButton.addEventListener('click', () => trierParCategorie('appartement'));
    hotelButton.addEventListener('click', () => trierParCategorie('hôtel'));
  })
  .catch(error => console.error(error));

/** RECUPERATION DES IMAGES **/

fetch('http://localhost:5678/api/works')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log('en cours');
    console.log(data);

    const projetsNode = document.querySelector('#projets');

    for (let i = 0; i < data.length; i++) {
      const currentTitle = data[i].title;
      const currentImageUrl = data[i].imageUrl;
      projetsNode.innerHTML += `
        <div class="work">
          <img src="${currentImageUrl}" alt="${currentTitle}" style="width: calc(100% / 3 - 20px);">
          <p>${currentTitle}</p>
        </div>`;
      //}
    }
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des travaux :', error);
  });

 