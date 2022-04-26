## GEAI-SERIE Auriane B3 DEV
# Evaluation PicturesApp

## Fonctionnement

Pour upload une image sur server.js, il faut cliquer sur l'image de la galerie voulue et un icône de téléchargement rouge est disponible pour uploader.
Penser à modifier l'url dans la requête dans le fichier <strong>modalImage.tsx</strong> du dossier <strong>components</strong> car j'ai dû utiliser <strong>ngrok</strong> pour que les requêtes fonctionnent.

## Informations complémentaires
Il pourrait manquer une meilleure factorisation des composants en faisant passer en props le tableau d'images et les states(notamment dans gallery.tsx). 

Créer plus de class au lieu d'intégrer le css en dur dans chaque composant.

Régler le beug du bottom sheet lorsqu'il y a plusieurs images. Car en un clic il ouvre plusieurs bottom sheet pour chaque photo.




