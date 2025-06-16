# Maquette-Smart-Analyser

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Nchanti33/Maquette-Smart-Analyser)

## Project Documentation / Documentation du projet

### English

#### Description

Maquette-Smart-Analyser is a Next.js-based project designed to analyze and process hierarchical documents.

#### How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

#### Build for Production

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

---

### 🎯 **Smart Analyzer Objective**

Automate the extraction, detection, and structuring of **business specifications** found in technical documents (CCTP, tenders, etc.) in order to:

- Reduce analysis time
- Avoid omissions
- Secure and capitalize business content

---

### ⚙️ **Step-by-step Operation**

1. **Structural extraction**

   - Hierarchical identification of sections, titles, paragraphs
   - Conversion to structured JSON

2. **Logical segmentation**

   - Splitting the document into coherent business paragraphs
   - Taking into account conditions, clauses, enumerations, etc.

3. **Request detection via LLM**

   - Analysis of each paragraph with AI
   - Identification of intentions: need, constraint, obligation, etc.

4. **Exhaustive summary**

   - Clear and unified reformulation of detected requests
   - Removal of ambiguities

5. **Extraction of technical variables**

   - Identification of objects, thresholds, actions, conditions
   - Structuring in JSON format for future use

6. **User validation**

   - Clear interface to validate, modify or reject lines
   - Ensures business quality and traceability

7. **Vectorization and storage**
   - Semantic indexing of paragraphs with FAISS
   - Intelligent similarity search possible

---

### ✅ **Expected Result**

- An exploitable and structured base of **clear specifications**
- Reusable for other projects or tenders
- Connected to the company's business tools (CRM, EDM, etc.)

---

### Français

#### Description

Maquette-Smart-Analyser est un projet basé sur Next.js conçu pour analyser et traiter des documents hiérarchiques.

#### Comment lancer

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrir votre navigateur et naviguer vers `http://localhost:3000`.

#### Construire pour la production

1. Construire le projet :
   ```bash
   npm run build
   ```
2. Démarrer le serveur de production :
   ```bash
   npm run start
   ```

---

### 🎯 **Objectif du Smart Analyzer**

Automatiser l’extraction, la détection et la structuration des **spécifications métier** présentes dans des documents techniques (CCTP, appels d’offres, etc.) afin de :

- Réduire le temps d’analyse
- Éviter les oublis
- Fiabiliser et capitaliser le contenu métier

---

### ⚙️ **Fonctionnement en étapes**

1. **Extraction structurelle**

   - Identification hiérarchique des sections, titres, paragraphes
   - Conversion en JSON structuré

2. **Segmentation logique**

   - Découpe du document en paragraphes métier cohérents
   - Prise en compte des conditions, clauses, énumérations, etc.

3. **Détection des demandes via LLM**

   - Analyse de chaque paragraphe avec IA
   - Identification des intentions : besoin, contrainte, obligation, etc.

4. **Résumé exhaustif**

   - Reformulation claire et unifiée des demandes détectées
   - Suppression des ambiguïtés

5. **Extraction de variables techniques**

   - Identification des objets, seuils, actions, conditions
   - Structuration en format JSON pour exploitation future

6. **Validation utilisateur**

   - Interface claire pour valider, modifier ou rejeter les lignes
   - Assure la qualité métier et la traçabilité

7. **Vectorisation et stockage**
   - Indexation sémantique des paragraphes avec FAISS
   - Recherche intelligente par similarité possible

---

### ✅ **Résultat attendu**

- Une base exploitable et structurée de **spécifications claires**
- Réutilisable pour d'autres projets ou appels d’offres
- Connectée aux outils métiers de l’entreprise (CRM, GED, etc.)
