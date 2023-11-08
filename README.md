# Application Node.js avec Routes

Cec est un exemple d'application Node.js simple avec plusieurs routes. L'application utilise le module HTTP pour créer un serveur web et gérer différentes routes pour gerer un stock d'articles.

## Configuration requise

Avant de commencer, assurez-vous d'avoir Node.js installé sur votre système. Vous pouvez le télécharger depuis [le site officiel de Node.js](https://nodejs.org/).

## Installation

1. Clonez ce référentiel sur votre ordinateur en utilisant la commande suivante :
```
git clone https://github.com/M5-ux/ece-webtech-gr06-605
```
2. Accédez au répertoire du projet :
```
cd nom-du-repertoire
```
3. Installez les dépendances en exécutant la commande suivante :
```
npm install
```
## Utilisation

Pour lancer l'application, utilisez l'une des commandes suivantes :

- Pour démarrer l'application en mode développement (rechargement automatique lors des modifications) :

```
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Routes disponibles

- `/` : Page d'accueil avec un lien vers `/articles`, `/about`, `/contacts`, `/login-controlled` en passanrt par un bouton Login.
- `/articles` : Permet d'obtenir la liste de tous les articles.
- `/articles/:articleId` : Permet d'obtenir un article par son ID.
- `/about` : Affiche les informations du site.
- `/contacts` : Nos contacts
- `/login-controlled` : Page de connexion

## Structure du projet

- `pages` : Toutes les pages JS de notre site
- `styles` : Gestionnaire de styles du site dépendances, les scripts de démarrage, etc.

## Contribuer

N'hésitez pas à contribuer en ouvrant des problèmes ou en soumettant des demandes de tirage (pull requests) pour améliorer l'application.

## Auteurs

- [Jonathan VELIN](https://github.com/jonathan971)
- [Mathias NERIS](https://github.com/M5-ux)
- [Omar LAHBABI](https://github.com/omar2929)
