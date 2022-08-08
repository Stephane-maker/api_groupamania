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
nodemon server
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

## Post 
 Postman post

- crée un post: "/createdPost"
```
{
    "post" : "first post with postman"
}
```
- affiché tout les post : "/allPost" 
```
postman agent 
url: "/api/allPost
method: get
```

- affiché un post : "/allPost/:id"

```
postman agent 
url: "/api/allPost/:id
method: get
```

- Modifié un post : "/:id/modifyPost"

```
{
    "post": "You new post"
}
```

- Supprimé un post : "/:id/deletePost"
```
postman agent
url: "/api/:id/deletePost"
method: post
``` 

L'argument "post" est impose par le Schema si il est manquant l'API retournera automatiquement une erruer
-

 ## A venir
 1) Modification suivant l'user qui as poster le Post
 2) Photo de profil 
 3) Modification est suppression photo de profil 
 4) Image dans les Post 
 5) Page avec les Discution instantanée 
 6) suppression des message envoye dans la Discution instantanée 
