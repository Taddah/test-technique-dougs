# Test Technique 

J'ai réalisé ce test technique en écrivant le code comme si c'était du code en production et complexe donc en utilisant tout ce qui est resolver, injection de token, services ou @defer, etc... sur la liste des catégories.
C'est beaucoup pour juste une simple liste d'élément où j'aurais pu faire plus simple mais j'ai pensé qu'il valait mieux imaginer ce test technique comme une grosse app complexe.

Il y a un storybook de fonctionnel (npm run storybook).
Des tests sont en place et peuvent être lancé avec npm run test
Pareil pour le lint et le formattage (npm run lint/npm run format), chaque commit a un lint de lancé et ne sera pas exécuté si le lint n'est pas bon.

Pour lancer le serveur, 2 solutions:

### Mode A : Vite Proxy 

**Config** : proxy.conf.json (target: http://127.0.0.1:3001 or http://localhost ou IP locale).
Lancement: 
```bash
npm run start-with-proxy
```
  
### Mode B : Direct (Fallback)
**Requis**: Modifier le serveur node pour utiliser le middleware cors()

**Config**: Mettre à jour la factory dans `src/app/core/tokens/category-api-url.token.ts` pour mettre `http://localhost:3001`

Lancement: 
```bash
npm run start
```
