# Api Groupamania
ApiGroupamania est une api de reseau social dediée a l'application groupamania code en node.js

## Installation
```
git clone
```
```
npm install
```
```
npm start
```
------
## Usage User
postman user

- "/api/auth/signup
``` 
{
    email: "email@gmail.com",
    password: "password"
}
```

- "/api/aut/login"
```
{
    email: "email@gmail.com",
    password: "password"
}
```

 Le Schema User est impose si un des arguments est manquants l'API retournera automatiquement une erreur 
 -

 -----

 ## A venir

 1) Mettre en place systeme de Post
 2) Affichage des Post 
 3) Modification suivant l'user qui as poster le Post
 4) Photo de profil 
 5) Modification est suppression photo de profil 
 6) Image dans les Post 
 7) Page avec les Discution instantanée 
 8) suppression des message envoye dans la Discution instantanée 
