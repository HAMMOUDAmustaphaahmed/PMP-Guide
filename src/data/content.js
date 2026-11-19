// src/data/content.js
export const getContent = (lang = 'fr') => {
  // ----- Définition des chapitres en français (complet) -----
  const frChapters = [
    {
      id: 'ch1',
      num: '01',
      accent: '#2563EB',
      accentDark: '#1D4ED8',
      title: 'Fondamentaux du Project Management',
      desc: 'Concepts clés, définitions et cadre général',
      sections: [
        {
          id: 's1-1',
          type: 'text+box',
          heading: "Qu'est-ce qu'un Projet ?",
          body: 'Un projet est un effort **temporaire** entrepris pour créer un produit, un service ou un résultat unique. Il se distingue des opérations courantes par son caractère unique et sa durée limitée.',
          box: {
            title: '5 Caractéristiques fondamentales d\'un projet',
            color: '#2563EB',
            bg: '#DBEAFE',
            items: [
              '**Temporaire** — début et fin clairement définis',
              '**Unique** — résultat qui n\'a jamais existé exactement ainsi',
              '**Progressif** — développé étape par étape',
              '**Limité en ressources** — budget, temps et équipe définis',
              '**Porteur de valeur** — répond à un besoin métier ou stratégique',
            ],
          },
        },
        {
          id: 's1-2',
          type: 'table',
          heading: 'Le Triangle des Contraintes',
          headers: ['Contrainte', 'Description', 'Indicateurs clés', 'Impact si dégradé'],
          rows: [
            ['⏱ Délai', 'Date de livraison et jalons', 'SPI, SV', 'Opportunité manquée'],
            ['💰 Coût', 'Budget total et dépenses', 'CPI, CV, ROI', 'Dépassement / annulation'],
            ['📦 Périmètre', 'Fonctionnalités et livrables', 'Vélocité, % complétion', 'Insatisfaction client'],
            ['✅ Qualité', '4e dimension transversale', 'Défauts, tests réussis', 'Retravail, insatisfaction'],
          ],
        },
        {
          id: 's1-3',
          type: 'table',
          heading: 'Les Parties Prenantes (Stakeholders)',
          headers: ['Catégorie', 'Exemples', 'Influence'],
          rows: [
            ['Internes', 'Sponsor, équipe projet, PMO, direction', '★★★★★ Très élevée'],
            ['Externes directs', 'Client, fournisseurs, sous-traitants', '★★★★☆ Élevée'],
            ['Externes indirects', 'Régulateurs, communauté, média', '★★★☆☆ Moyenne'],
            ['Silencieux', 'Utilisateurs finaux, employés impactés', '★★★☆☆ Moyenne à forte'],
          ],
        },
        {
          id: 's1-4',
          type: 'badges',
          heading: 'Rôles du Chef de Projet',
          items: [
            { title: '🎯 Pilote stratégique', color: '#2563EB', bg: '#DBEAFE', desc: 'Aligner le projet sur la stratégie et défendre sa valeur auprès des décideurs.' },
            { title: '👥 Leader d\'équipe', color: '#059669', bg: '#D1FAE5', desc: 'Motiver, faciliter, résoudre les conflits, développer les compétences.' },
            { title: '📊 Gestionnaire de performance', color: '#D97706', bg: '#FEF3C7', desc: 'Mesurer via KPI, ajuster les plans, rendre compte à la direction.' },
            { title: '⚠️ Gestionnaire des risques', color: '#DC2626', bg: '#FEE2E2', desc: 'Identifier, évaluer et traiter proactivement les menaces et opportunités.' },
            { title: '📢 Communicant', color: '#7C3AED', bg: '#EDE9FE', desc: 'Adapter les messages à chaque audience, gérer les attentes.' },
            { title: '🔧 Intégrateur', color: '#0D9488', bg: '#CCFBF1', desc: 'Coordonner les équipes, fournisseurs et flux de travail pour la cohérence.' },
          ],
        },
      ],
    },
    {
      id: 'ch2',
      num: '02',
      accent: '#7C3AED',
      accentDark: '#6D28D9',
      title: 'Valeurs, Principes & Éthique PMI',
      desc: 'Les 12 Principes du PMBOK 7e Édition',
      sections: [
        {
          id: 's2-1',
          type: 'badges',
          heading: 'Les 12 Principes du PMBOK 7',
          items: [
            { title: 'P1 · Intendance', color: '#2563EB', bg: '#DBEAFE', desc: 'Être un gestionnaire diligent, respectueux et responsable.' },
            { title: 'P2 · Équipe', color: '#059669', bg: '#D1FAE5', desc: 'Créer un environnement collaboratif favorisant la confiance.' },
            { title: 'P3 · Parties prenantes', color: '#0D9488', bg: '#CCFBF1', desc: 'S\'engager activement pour comprendre les besoins.' },
            { title: 'P4 · Valeur', color: '#D97706', bg: '#FEF3C7', desc: 'Se concentrer sur la création de valeur pour l\'organisation.' },
            { title: 'P5 · Pensée systémique', color: '#7C3AED', bg: '#EDE9FE', desc: 'Reconnaître les interactions complexes du système projet.' },
            { title: 'P6 · Leadership', color: '#2563EB', bg: '#DBEAFE', desc: 'Démontrer des comportements de leadership et inspirer.' },
            { title: 'P7 · Adaptation contextuelle', color: '#059669', bg: '#D1FAE5', desc: 'Adapter l\'approche au contexte et aux contraintes.' },
            { title: 'P8 · Qualité', color: '#DC2626', bg: '#FEE2E2', desc: 'Intégrer la qualité dans les processus et les livrables.' },
            { title: 'P9 · Complexité', color: '#0D9488', bg: '#CCFBF1', desc: 'Naviguer dans la complexité avec des méthodes adaptées.' },
            { title: 'P10 · Risques', color: '#D97706', bg: '#FEF3C7', desc: 'Évaluer et gérer continuellement les risques.' },
            { title: 'P11 · Adaptabilité & Résilience', color: '#7C3AED', bg: '#EDE9FE', desc: 'Intégrer l\'adaptabilité dans les approches organisationnelles.' },
            { title: 'P12 · Gestion du changement', color: '#2563EB', bg: '#DBEAFE', desc: 'Préparer et faciliter le changement pour créer de la valeur.' },
          ],
        },
        {
          id: 's2-2',
          type: 'box',
          heading: 'Code de Déontologie PMI',
          box: {
            title: 'Les 4 Valeurs Fondamentales PMI',
            color: '#7C3AED',
            bg: '#EDE9FE',
            items: [
              '**Responsabilité** — Prendre en charge ses décisions et leurs conséquences.',
              '**Respect** — Traiter toutes les personnes avec dignité, écouter activement.',
              '**Équité** — Décisions impartiales, éviter les conflits d\'intérêt.',
              '**Honnêteté** — Communiquer de manière véridique et transparente.',
            ],
          },
        },
        {
          id: 's2-3',
          type: 'table',
          heading: 'Styles de Leadership',
          headers: ['Style', 'Caractéristiques', 'Quand l\'utiliser', 'Risques'],
          rows: [
            ['Transformationnel', 'Vision inspirante, innovation', 'Transformation organisationnelle', 'Perte de focus opérationnel'],
            ['Serviteur', 'Soutien équipe, écoute', 'Équipes Agile matures', 'Manque d\'autorité perçue'],
            ['Transactionnel', 'Objectifs, récompenses/sanctions', 'Projets stables', 'Démotivation long terme'],
            ['Démocratique', 'Consensus, participation', 'Décisions complexes', 'Lenteur de décision'],
            ['Directif', 'Instructions claires, contrôle', 'Crise, urgence', 'Dépendance, démotivation'],
            ['Coach', 'Développement individuel, feedback', 'Montée en compétences', 'Chronophage'],
          ],
        },
      ],
    },
    {
      id: 'ch3',
      num: '03',
      accent: '#059669',
      accentDark: '#047857',
      title: 'Cycles de Vie & Phases du Projet',
      desc: 'Approches prédictives, adaptatives et hybrides',
      sections: [
        {
          id: 's3-1',
          type: 'phases',
          heading: 'Cycle de Vie Prédictif (Waterfall)',
          items: [
            { label: '📋 INITIATION', desc: 'Charte projet, identification des PI, objectifs SMART, business case.', color: '#2563EB' },
            { label: '📐 PLANIFICATION', desc: 'WBS, Gantt/CPM, budget, risques, communication, plan qualité.', color: '#059669' },
            { label: '⚙️ EXÉCUTION', desc: 'Coordination équipes, fournisseurs, développement des livrables.', color: '#D97706' },
            { label: '📊 SUIVI & CONTRÔLE', desc: 'EVM, gestion des modifications, contrôle des risques, reporting.', color: '#7C3AED' },
            { label: '🏁 CLÔTURE', desc: 'Validation livrables, transfert, RETEX, archivage, dissolution équipe.', color: '#0D9488' },
          ],
        },
        {
          id: 's3-2',
          type: 'box',
          heading: 'Les 4 Valeurs du Manifeste Agile',
          box: {
            title: 'Manifeste Agile (2001)',
            color: '#059669',
            bg: '#D1FAE5',
            items: [
              '**Individus et interactions** plutôt que processus et outils',
              '**Logiciels opérationnels** plutôt que documentation exhaustive',
              '**Collaboration avec le client** plutôt que négociation contractuelle',
              '**Adaptation au changement** plutôt que suivi d\'un plan',
            ],
          },
        },
        {
          id: 's3-3',
          type: 'table',
          heading: 'Les 5 Groupes de Processus PMBOK',
          headers: ['Groupe', 'Nb Processus', 'Livrables Clés', 'Question clé'],
          rows: [
            ['Démarrage', '2', 'Charte projet, Registre des PI', 'Pourquoi ? Qui ? Quoi ?'],
            ['Planification', '24', 'Plans subsidiaires, Baseline', 'Comment ? Quand ? Combien ?'],
            ['Exécution', '10', 'Livrables, Données de performance', 'Qui fait quoi ?'],
            ['Surveillance & Maîtrise', '12', 'Rapports, Demandes de modification', 'Où en sommes-nous ?'],
            ['Clôture', '1', 'Document clôture, RETEX', 'Qu\'avons-nous appris ?'],
          ],
        },
      ],
    },
    {
      id: 'ch4',
      num: '04',
      accent: '#D97706',
      accentDark: '#B45309',
      title: 'Méthodologies de Gestion de Projet',
      desc: 'Panorama complet et guide de sélection',
      sections: [
        {
          id: 's4-1',
          type: 'table',
          heading: 'PRINCE2 — 7 Principes · 7 Thèmes · 7 Processus',
          headers: ['7 Principes', '7 Thèmes', '7 Processus'],
          rows: [
            ['Justification continue', 'Business Case', 'Préparer l\'environnement'],
            ['Apprendre de l\'expérience', 'Organisation', 'Diriger le projet'],
            ['Rôles définis', 'Qualité', 'Initialiser le projet'],
            ['Gérer par exception', 'Plans', 'Contrôler une séquence'],
            ['Focalisation produits', 'Risques', 'Gérer la livraison produits'],
            ['Adapter l\'environnement', 'Modifications', 'Gérer les frontières'],
            ['Gestion par séquences', 'Progrès', 'Clore le projet'],
          ],
        },
        {
          id: 's4-2',
          type: 'table',
          heading: 'Scrum Framework',
          headers: ['Rôles', 'Cérémonies', 'Artefacts'],
          rows: [
            ['Product Owner (Vision & backlog)', 'Sprint Planning (début sprint)', 'Product Backlog'],
            ['Scrum Master (facilitateur)', 'Daily Scrum (15 min / jour)', 'Sprint Backlog'],
            ['Dev Team (auto-organisée)', 'Sprint Review (démonstration)', 'Increment'],
            ['—', 'Sprint Retrospective', 'Definition of Done'],
          ],
        },
        {
          id: 's4-3',
          type: 'table',
          heading: 'Tableau Comparatif des Méthodologies',
          headers: ['Critère', 'PMBOK', 'PRINCE2', 'Scrum', 'Kanban', 'SAFe'],
          rows: [
            ['Taille projet', 'Toutes', 'Moyen/Grand', 'Petit/Moyen', 'Petite équipe', 'Grand/Échelle'],
            ['Périmètre', 'Défini', 'Défini', 'Évolutif', 'Flux continu', 'Évolutif'],
            ['Certification', 'PMP, CAPM', 'Foundation', 'PSM, CSM', 'KMP', 'SP, RTE'],
            ['Complexité impl.', 'Moyenne', 'Élevée', 'Simple', 'Simple', 'Très élevée'],
            ['Secteur', 'Universel', 'IT, Gov', 'IT, Digital', 'IT, Services', 'Grande IT'],
          ],
        },
      ],
    },
    {
      id: 'ch5',
      num: '05',
      accent: '#0D9488',
      accentDark: '#0F766E',
      title: 'Planification & Gestion du Périmètre',
      desc: 'WBS, charte de projet et maîtrise du scope',
      sections: [
        {
          id: 's5-1',
          type: 'box',
          heading: 'La Charte de Projet',
          box: {
            title: 'Contenu de la Charte de Projet',
            color: '#0D9488',
            bg: '#CCFBF1',
            items: [
              'Objectifs du projet et critères de succès mesurables (SMART)',
              'Périmètre de haut niveau (inclus / exclus)',
              'Livrables principaux attendus',
              'Jalons clés et date de fin souhaitée',
              'Budget estimatif et ressources approuvées',
              'Risques majeurs identifiés au démarrage',
              'Parties prenantes clés et niveaux d\'autorité',
              'Hypothèses et contraintes connues',
            ],
          },
        },
        {
          id: 's5-2',
          type: 'box',
          heading: 'WBS — Work Breakdown Structure',
          box: {
            title: 'Règles d\'or de la WBS',
            color: '#0D9488',
            bg: '#CCFBF1',
            items: [
              '**Règle 100%** — la WBS doit capturer 100% du travail du périmètre',
              '**Livrables, pas actions** — les éléments décrivent des QUOI, pas des COMMENT',
              '**Numérotation hiérarchique** — 1.0, 1.1, 1.1.1…',
              '**Dictionnaire WBS** — chaque work package doit être documenté',
              '**Niveau de décomposition** — jusqu\'aux work packages estimables',
            ],
          },
        },
        {
          id: 's5-3',
          type: 'badges',
          heading: 'Méthode MoSCoW de Priorisation',
          items: [
            { title: 'MUST have', color: '#DC2626', bg: '#FEE2E2', desc: 'Absolument obligatoire. Sans cela, le projet échoue.' },
            { title: 'SHOULD have', color: '#D97706', bg: '#FEF3C7', desc: 'Important mais pas vital. Peut être différé si nécessaire.' },
            { title: 'COULD have', color: '#2563EB', bg: '#DBEAFE', desc: 'Souhaitable. Inclus si temps/budget le permettent.' },
            { title: 'WON\'T have', color: '#64748B', bg: '#F1F5F9', desc: 'Hors périmètre pour cette livraison. Documenté pour l\'avenir.' },
          ],
        },
      ],
    },
    {
      id: 'ch6',
      num: '06',
      accent: '#DC2626',
      accentDark: '#B91C1C',
      title: 'Gestion des Délais & Planning',
      desc: 'Estimation, Chemin Critique et PERT',
      sections: [
        {
          id: 's6-1',
          type: 'table',
          heading: 'Techniques d\'Estimation',
          headers: ['Technique', 'Méthode', 'Précision', 'Quand utiliser'],
          rows: [
            ['Analogique', 'Projets similaires passés', '±25–50%', 'Début, peu d\'info'],
            ['Paramétrique', 'Équation + données historiques', '±10–25%', 'Données disponibles'],
            ['Bottom-Up', 'Détail WBS + agrégation', '±5–10%', 'Planification détaillée'],
            ['PERT 3 points', '(O + 4M + P) / 6', '±5–15%', 'Incertitude élevée'],
            ['Poker Planning', 'Vote consensus équipe', 'Variable', 'Sprint planning Scrum'],
          ],
        },
        {
          id: 's6-2',
          type: 'box',
          heading: 'Chemin Critique (CPM)',
          box: {
            title: 'Concepts Clés du CPM',
            color: '#DC2626',
            bg: '#FEE2E2',
            items: [
              '**ES** (Early Start) — date de début au plus tôt',
              '**EF** (Early Finish) = ES + Durée',
              '**LS** (Late Start) — date de début au plus tard',
              '**LF** (Late Finish) — date de fin au plus tard',
              '**Float / Marge** = LS − ES = LF − EF',
              '**Chemin critique** = séquence avec Float = 0',
              '**Fast Tracking** — parallélisation des tâches (risque accru)',
              '**Crashing** — ajout de ressources (coût accru)',
            ],
          },
        },
        {
          id: 's6-3',
          type: 'table',
          heading: 'Formule PERT',
          headers: ['Paramètre', 'Symbole', 'Formule'],
          rows: [
            ['Optimiste', 'O', 'Durée dans le meilleur des cas'],
            ['Pessimiste', 'P', 'Durée dans le pire des cas'],
            ['Most Likely', 'M', 'Durée la plus probable'],
            ['Espérance', 'E', 'E = (O + 4M + P) / 6'],
            ['Écart-type', 'σ', 'σ = (P − O) / 6'],
            ['Variance', 'σ²', 'σ² = ((P − O) / 6)²'],
          ],
        },
      ],
    },
    {
      id: 'ch7',
      num: '07',
      accent: '#059669',
      accentDark: '#047857',
      title: 'Gestion des Coûts & Budget',
      desc: 'EVM — Earned Value Management',
      sections: [
        {
          id: 's7-1',
          type: 'kpi',
          heading: 'Les 4 Valeurs de Base EVM',
          items: [
            { label: 'PV — Valeur Planifiée', value: 'Planned Value', color: '#2563EB', bg: '#DBEAFE' },
            { label: 'EV — Valeur Acquise', value: 'Earned Value', color: '#059669', bg: '#D1FAE5' },
            { label: 'AC — Coût Réel', value: 'Actual Cost', color: '#DC2626', bg: '#FEE2E2' },
            { label: 'BAC — Budget Total', value: 'Budget at Completion', color: '#D97706', bg: '#FEF3C7' },
          ],
        },
        {
          id: 's7-2',
          type: 'table',
          heading: 'Toutes les Formules EVM',
          headers: ['Indicateur', 'Formule', 'Bonne performance', 'Seuil d\'alerte'],
          rows: [
            ['CV (Variance Coût)', 'EV − AC', 'CV ≥ 0', 'CV < 0'],
            ['SV (Variance Délai)', 'EV − PV', 'SV ≥ 0', 'SV < 0'],
            ['CPI (Indice Coût)', 'EV ÷ AC', 'CPI ≥ 1', 'CPI < 0.9'],
            ['SPI (Indice Délai)', 'EV ÷ PV', 'SPI ≥ 1', 'SPI < 0.9'],
            ['EAC (Coût Final Estimé)', 'BAC ÷ CPI', 'EAC ≤ BAC', 'EAC > BAC'],
            ['ETC (Reste à dépenser)', 'EAC − AC', 'ETC ≤ Budget restant', '—'],
            ['VAC (Variance finale)', 'BAC − EAC', 'VAC ≥ 0', 'VAC < 0'],
            ['TCPI', '(BAC−EV) ÷ (BAC−AC)', 'TCPI ≤ 1.1', 'TCPI > 1.1'],
          ],
        },
      ],
    },
    {
      id: 'ch8',
      num: '08',
      accent: '#DC2626',
      accentDark: '#B91C1C',
      title: 'Gestion des Risques',
      desc: 'Identification, analyse, réponse et suivi',
      sections: [
        {
          id: 's8-1',
          type: 'phases',
          heading: '7 Processus de Gestion des Risques',
          items: [
            { label: '1. Planifier', desc: 'Définir approches et méthodes de gestion des risques.', color: '#2563EB' },
            { label: '2. Identifier', desc: 'Documenter les risques pouvant affecter le projet.', color: '#059669' },
            { label: '3. Analyse qualitative', desc: 'Évaluer probabilité et impact — Matrice P×I pour prioriser.', color: '#D97706' },
            { label: '4. Analyse quantitative', desc: 'Analyser numériquement l\'effet des risques sur les objectifs.', color: '#7C3AED' },
            { label: '5. Planifier réponses', desc: 'Définir les actions pour chaque risque priorisé.', color: '#0D9488' },
            { label: '6. Implémenter', desc: 'Exécuter les plans de réponse aux risques.', color: '#DC2626' },
            { label: '7. Surveiller', desc: 'Suivre, détecter les nouveaux risques, évaluer l\'efficacité.', color: '#2563EB' },
          ],
        },
        {
          id: 's8-2',
          type: 'risk-matrix',
          heading: 'Matrice Probabilité × Impact',
        },
        {
          id: 's8-3',
          type: 'table',
          heading: 'Stratégies de Réponse aux Risques',
          headers: ['Stratégie', 'Pour les Menaces', 'Pour les Opportunités', 'Description'],
          rows: [
            ['Éviter / Exploiter', 'Éviter', 'Exploiter', 'Éliminer la menace / Garantir l\'opportunité'],
            ['Transférer / Partager', 'Transférer', 'Partager', 'Déplacer vers un tiers (assurance, sous-traitance)'],
            ['Atténuer / Améliorer', 'Atténuer', 'Améliorer', 'Réduire prob/impact ou augmenter les chances'],
            ['Accepter', 'Accepter passive', 'Accepter', 'Aucune action pro-active, surveiller'],
            ['Escalader', 'Escalader', 'Escalader', 'Transmettre au niveau hiérarchique approprié'],
          ],
        },
      ],
    },
    {
      id: 'ch9',
      num: '09',
      accent: '#2563EB',
      accentDark: '#1D4ED8',
      title: 'KPI & Tableaux de Bord',
      desc: 'Identifier les bons KPI, analyser les données, piloter la performance',
      sections: [
        {
          id: 's9-1',
          type: 'box',
          heading: 'Critères d\'un Bon KPI',
          box: {
            title: 'Un KPI efficace est SMART + Actionnable',
            color: '#2563EB',
            bg: '#DBEAFE',
            items: [
              '**Aligné** — sur les objectifs stratégiques du projet et de l\'organisation',
              '**Actionnable** — permet de prendre une décision si la cible n\'est pas atteinte',
              '**Fiable** — données collectées de manière cohérente et objective',
              '**Comparatif** — comparable à une baseline ou un benchmark',
              '**Contextualisé** — accompagné de son seuil cible, alerte et critique',
              '**Temporel** — mesuré à fréquence définie (quotidien, hebdo, mensuel)',
            ],
          },
        },
        {
          id: 's9-2',
          type: 'table',
          heading: 'KPI Délais & Coûts',
          headers: ['KPI', 'Formule', 'Interprétation', 'Cible'],
          rows: [
            ['SPI', 'EV / PV', '> 1 : en avance', '> 0.95'],
            ['SV', 'EV − PV', 'Positif = OK', '> 0'],
            ['% jalons respectés', 'Jalons OK / planifiés', '100% idéal', '> 90%'],
            ['CPI', 'EV / AC', '> 1 : sous budget', '> 0.95'],
            ['ROI', '(Bénéfices−Coûts)/Coûts×100', 'Le plus élevé possible', '> 20%'],
          ],
        },
        {
          id: 's9-3',
          type: 'box',
          heading: 'Architecture du Dashboard Projet',
          box: {
            title: 'Structure Recommandée',
            color: '#2563EB',
            bg: '#DBEAFE',
            items: [
              '**Vue Exécutive (1 page)** — RAG Status, KPI clés, % avancement, prochains jalons',
              '**Vue Opérationnelle** — Gantt avancement, burn down chart, vélocité, blocages',
              '**Vue Financière** — Courbe S (PV/EV/AC), CPI/SPI, prévision EAC vs BAC',
              '**Vue Risques** — Top 5 risques actifs, matrice P×I, actions en cours',
              '**Vue Équipe** — utilisation ressources, charge de travail, satisfaction',
            ],
          },
        },
      ],
    },
    {
      id: 'ch10',
      num: '10',
      accent: '#0D9488',
      accentDark: '#0F766E',
      title: 'Qualité, Amélioration Continue & Lean',
      desc: 'PDCA, Six Sigma, DMAIC, 5S, Ishikawa',
      sections: [
        {
          id: 's10-1',
          type: 'badges',
          heading: 'Cycle PDCA (Roue de Deming)',
          items: [
            { title: 'PLAN — Planifier', color: '#2563EB', bg: '#DBEAFE', desc: 'Identifier le problème, analyser les causes, définir les objectifs et les actions correctives.' },
            { title: 'DO — Faire', color: '#059669', bg: '#D1FAE5', desc: 'Mettre en œuvre les actions sur un périmètre limité (pilote). Documenter les résultats.' },
            { title: 'CHECK — Vérifier', color: '#D97706', bg: '#FEF3C7', desc: 'Mesurer et analyser les résultats vs objectifs. Identifier les écarts.' },
            { title: 'ACT — Agir', color: '#DC2626', bg: '#FEE2E2', desc: 'Standardiser les améliorations si efficaces, ou recommencer avec de nouvelles actions.' },
          ],
        },
        {
          id: 's10-2',
          type: 'phases',
          heading: 'Six Sigma — DMAIC',
          items: [
            { label: 'D — Define', desc: 'Définir le problème (CTQ), cartographier le processus (SIPOC), définir la charte.', color: '#2563EB' },
            { label: 'M — Measure', desc: 'Collecter les données, mesurer la capacité du processus (Cp, Cpk), baseline DPMO.', color: '#059669' },
            { label: 'A — Analyze', desc: 'Identifier les causes racines (Ishikawa, 5 Pourquoi), valider statistiquement.', color: '#D97706' },
            { label: 'I — Improve', desc: 'Générer et sélectionner des solutions (DOE, FMEA), implémenter en pilote.', color: '#7C3AED' },
            { label: 'C — Control', desc: 'Pérenniser (SPC), documenter les standards, transférer aux équipes opérationnelles.', color: '#0D9488' },
          ],
        },
        {
          id: 's10-3',
          type: 'table',
          heading: 'Méthode 5S',
          headers: ['Étape', 'Mot japonais', 'Action', 'Bénéfice'],
          rows: [
            ['1S', 'Seiri — Supprimer', 'Éliminer tout ce qui est inutile', 'Espace dégagé'],
            ['2S', 'Seiton — Situer', 'Organiser chaque chose à sa place', 'Accès rapide'],
            ['3S', 'Seiso — Scintiller', 'Nettoyer et inspecter régulièrement', 'Anomalies visibles'],
            ['4S', 'Seiketsu — Standardiser', 'Établir des standards visuels', 'Cohérence'],
            ['5S', 'Shitsuke — Suivre', 'Maintenir, auditer, améliorer', 'Culture qualité'],
          ],
        },
      ],
    },
    {
      id: 'ch11',
      num: '11',
      accent: '#7C3AED',
      accentDark: '#6D28D9',
      title: 'Communication & Parties Prenantes',
      desc: 'Plan de communication, RACI et gestion des conflits',
      sections: [
        {
          id: 's11-1',
          type: 'badges',
          heading: 'La Matrice RACI',
          items: [
            { title: 'R — Responsible', color: '#059669', bg: '#D1FAE5', desc: 'Réalise le travail. Peut être plusieurs personnes. Responsable de l\'exécution.' },
            { title: 'A — Accountable', color: '#DC2626', bg: '#FEE2E2', desc: 'Répond du résultat. UNE SEULE personne. Signe et approuve finalement.' },
            { title: 'C — Consulted', color: '#D97706', bg: '#FEF3C7', desc: 'Consulté avant décision. Communication bilatérale. Expert métier.' },
            { title: 'I — Informed', color: '#2563EB', bg: '#DBEAFE', desc: 'Informé du résultat ou de la décision. Communication unidirectionnelle.' },
          ],
        },
        {
          id: 's11-2',
          type: 'table',
          heading: 'Gestion des Conflits — Thomas-Kilmann',
          headers: ['Style', 'Assertivité', 'Coopération', 'Quand l\'utiliser'],
          rows: [
            ['Compétition (Forcer)', '★★★★★', '★☆☆☆☆', 'Urgence, décision critique'],
            ['Collaboration (Résoudre)', '★★★★★', '★★★★★', 'Solution gagnant-gagnant possible'],
            ['Compromis', '★★★☆☆', '★★★☆☆', 'Accord acceptable rapidement'],
            ['Accommodation (Céder)', '★☆☆☆☆', '★★★★★', 'Enjeu plus important pour l\'autre'],
            ['Évitement (Retrait)', '★☆☆☆☆', '★☆☆☆☆', 'Problème trivial, besoin de temps'],
          ],
        },
      ],
    },
    {
      id: 'ch12',
      num: '12',
      accent: '#D97706',
      accentDark: '#B45309',
      title: 'Approches Analytiques & Outils Avancés',
      desc: 'SWOT, PESTEL, Analyse des besoins, Gestion du changement',
      sections: [
        {
          id: 's12-1',
          type: 'swot',
          heading: 'Analyse SWOT',
          items: [
            { title: 'Forces', color: '#059669', bg: '#D1FAE5', desc: 'Atouts internes : compétences clés, ressources disponibles, réputation, avantages compétitifs.' },
            { title: 'Faiblesses', color: '#DC2626', bg: '#FEE2E2', desc: 'Limites internes : lacunes en compétences, budget limité, processus inefficaces, dépendances.' },
            { title: 'Opportunités', color: '#2563EB', bg: '#DBEAFE', desc: 'Facteurs externes favorables : nouveaux marchés, technologies émergentes, réglementations favorables.' },
            { title: 'Menaces', color: '#D97706', bg: '#FEF3C7', desc: 'Facteurs externes défavorables : concurrence accrue, instabilité économique, risques technologiques.' },
          ],
        },
        {
          id: 's12-2',
          type: 'table',
          heading: 'Analyse PESTEL',
          headers: ['Dim.', 'Facteurs à analyser', 'Exemples d\'impact projet'],
          rows: [
            ['P — Politique', 'Stabilité, politiques industrielles, régulations', 'Changements légaux, autorisations'],
            ['E — Économique', 'Inflation, taux change, croissance', 'Coût des ressources, budget'],
            ['S — Socioculturel', 'Démographie, valeurs, tendances', 'Adoption utilisateurs, communication'],
            ['T — Technologique', 'Innovation, R&D, automatisation', 'Choix technologiques, obsolescence'],
            ['E — Environnemental', 'RSE, réglementation, climat', 'Contraintes durabilité, image'],
            ['L — Légal', 'Droit du travail, RGPD, propriété intellectuelle', 'Conformité, contrats, responsabilité'],
          ],
        },
        {
          id: 's12-3',
          type: 'phases',
          heading: 'Gestion du Changement — ADKAR',
          items: [
            { label: 'A — Awareness', desc: 'Sensibiliser au besoin de changement. Communiquer le POURQUOI clairement.', color: '#2563EB' },
            { label: 'D — Desire', desc: 'Susciter le désir de participer et soutenir le changement. Gérer les résistances.', color: '#059669' },
            { label: 'K — Knowledge', desc: 'Former sur COMMENT changer. Compétences et comportements requis.', color: '#D97706' },
            { label: 'A — Ability', desc: 'Développer la capacité à mettre en pratique. Support, coaching, pratique.', color: '#7C3AED' },
            { label: 'R — Reinforcement', desc: 'Renforcer et pérenniser le changement. Reconnaissance, mesures, corrections.', color: '#0D9488' },
          ],
        },
      ],
    },
  ]

  // ----- Définition des annexes (communes) -----
  const annexes = {
    glossary: [
      ['Baseline', 'Plan de référence approuvé (scope, schedule, cost) servant de base de comparaison.'],
      ['Backlog', 'Liste priorisée de fonctionnalités ou tâches (Product / Sprint Backlog).'],
      ['BAC', 'Budget At Completion — valeur totale du budget approuvé.'],
      ['Critical Path', 'Séquence de tâches déterminant la durée minimale du projet. Float = 0.'],
      ['EVM', 'Earned Value Management — technique intégrée de mesure de performance coût-délai.'],
      ['Float / Slack', 'Temps disponible pour retarder une tâche sans retarder le projet.'],
      ['KPI', 'Indicateur clé de performance mesurant le degré d\'atteinte d\'un objectif.'],
      ['Lessons Learned', 'Connaissances acquises tirées de l\'expérience projet (RETEX).'],
      ['Milestone', 'Jalon : point de contrôle significatif avec durée nulle.'],
      ['PMO', 'Project Management Office — entité centralisant les standards et le support projets.'],
      ['RACI', 'Matrice : Responsible, Accountable, Consulted, Informed.'],
      ['Scope Creep', 'Extension non contrôlée du périmètre sans ajustement délai/coût.'],
      ['Sprint', 'Itération Scrum de durée fixe (1–4 semaines) produisant un incrément livrable.'],
      ['WBS', 'Work Breakdown Structure — décomposition hiérarchique du travail en livrables.'],
    ],
    formulas: [
      ['CV — Variance Coût', 'EV − AC', 'CV ≥ 0', 'Réduire coûts, replanifier'],
      ['SV — Variance Délai', 'EV − PV', 'SV ≥ 0', 'Accélérer, Fast Track'],
      ['CPI — Indice Coût', 'EV ÷ AC', 'CPI ≥ 1', 'Analyse dépassement'],
      ['SPI — Indice Délai', 'EV ÷ PV', 'SPI ≥ 1', 'Revue du planning'],
      ['EAC — Coût Final', 'BAC ÷ CPI', 'EAC ≤ BAC', 'Escalader au sponsor'],
      ['TCPI', '(BAC−EV) ÷ (BAC−AC)', 'TCPI ≤ 1.1', 'Redéfinir les objectifs'],
      ['PERT Duration', '(O + 4M + P) ÷ 6', 'Fiable', 'Réduire incertitude'],
    ],
    checklist: [
      'Charte de projet rédigée et signée par le sponsor',
      'Objectifs SMART définis et validés',
      'Parties prenantes identifiées — registre constitué',
      'Budget initial approuvé',
      'Équipe projet constituée et rôles définis (RACI)',
      'WBS complète et dictionnaire WBS rédigé',
      'Planning détaillé (Gantt) avec chemin critique identifié',
      'Plan de gestion des risques et registre initial',
      'Plan de communication validé par les parties prenantes',
      'Baseline scope / schedule / cost approuvée',
    ],
  }

  // ----- Traductions pour l'anglais et l'arabe (héro + titres/descriptions des chapitres) -----
  // Pour simplifier, on garde le contenu des sections en français, mais on traduit l'en-tête.

  // Fonction pour traduire les titres et descriptions des chapitres
  const translateChapters = (lang) => {
    return frChapters.map((ch, index) => {
      let title, desc
      if (lang === 'en') {
        const titles = [
          'Fundamentals of Project Management',
          'Values, Principles & PMI Ethics',
          'Project Life Cycles & Phases',
          'Project Management Methodologies',
          'Planning & Scope Management',
          'Schedule Management & Planning',
          'Cost Management & Budget',
          'Risk Management',
          'KPIs & Dashboards',
          'Quality, Continuous Improvement & Lean',
          'Communication & Stakeholders',
          'Analytical Approaches & Advanced Tools',
        ]
        const descs = [
          'Key concepts, definitions and general framework',
          'The 12 Principles of PMBOK 7th Edition',
          'Predictive, adaptive and hybrid approaches',
          'Complete overview and selection guide',
          'WBS, project charter and scope control',
          'Estimation, Critical Path and PERT',
          'EVM — Earned Value Management',
          'Identification, analysis, response and monitoring',
          'Identify the right KPIs, analyze data, drive performance',
          'PDCA, Six Sigma, DMAIC, 5S, Ishikawa',
          'Communication plan, RACI and conflict management',
          'SWOT, PESTEL, Needs analysis, Change management',
        ]
        title = titles[index] || ch.title
        desc = descs[index] || ch.desc
      } else if (lang === 'ar') {
        const titles = [
          'أساسيات إدارة المشاريع',
          'القيم والمبادئ وأخلاقيات PMI',
          'دورات حياة المشروع ومراحله',
          'منهجيات إدارة المشاريع',
          'التخطيط وإدارة النطاق',
          'إدارة الجدول الزمني والتخطيط',
          'إدارة التكاليف والميزانية',
          'إدارة المخاطر',
          'مؤشرات الأداء ولوحات القيادة',
          'الجودة والتحسين المستمر والـ Lean',
          'الاتصالات وأصحاب المصلحة',
          'المناهج التحليلية والأدوات المتقدمة',
        ]
        const descs = [
          'المفاهيم الأساسية والتعاريف والإطار العام',
          'مبادئ PMBOK الإصدار السابع الـ 12',
          'المناهج التنبؤية والتكيفية والهجينة',
          'نظرة شاملة ودليل اختيار',
          'WBS، ميثاق المشروع والتحكم في النطاق',
          'التقدير، المسار الحرج و PERT',
          'EVM — إدارة القيمة المكتسبة',
          'التحديد، التحليل، الاستجابة والمراقبة',
          'تحديد مؤشرات الأداء الصحيحة، تحليل البيانات، قيادة الأداء',
          'PDCA، Six Sigma، DMAIC، 5S، Ishikawa',
          'خطة الاتصالات، RACI وإدارة النزاعات',
          'SWOT، PESTEL، تحليل الاحتياجات، إدارة التغيير',
        ]
        title = titles[index] || ch.title
        desc = descs[index] || ch.desc
      } else {
        title = ch.title
        desc = ch.desc
      }
      return { ...ch, title, desc }
    })
  }

  // ----- Construction des objets par langue -----
  const fr = {
    hero: {
      eyebrow: 'Guide de gestion de projet',
      title: 'Apprendre la gestion de projet',
      subtitle: 'et préparer la certification PMP',
      description: 'Douze chapitres, des fondamentaux au pilotage par les indicateurs. Chaque notion tient dans un tableau, une liste ou un schéma, pour réviser vite. Gratuit, sans inscription.',
      stats: [
        { value: '12', label: 'Chapitres' },
        { value: '35', label: 'Sections' },
        { value: '70', label: 'Ouvrages cités' },
        { value: '3', label: 'Langues' },
      ],
      pills: ['PMBOK 7', 'PRINCE2', 'Scrum', 'Kanban', 'SAFe', 'Lean', 'Six Sigma', 'ADKAR'],
    },
    chapters: frChapters,
    annexes,
  }

  const en = {
    hero: {
      eyebrow: 'Project management guide',
      title: 'Learn project management',
      subtitle: 'and prepare for the PMP exam',
      description: 'Twelve chapters, from the fundamentals to steering by indicators. Each idea fits in a table, a list or a diagram, so you can revise quickly. Free, no sign-up.',
      stats: [
        { value: '12', label: 'Chapters' },
        { value: '35', label: 'Sections' },
        { value: '70', label: 'Books cited' },
        { value: '3', label: 'Languages' },
      ],
      pills: ['PMBOK 7', 'PRINCE2', 'Scrum', 'Kanban', 'SAFe', 'Lean', 'Six Sigma', 'ADKAR'],
    },
    chapters: translateChapters('en'),
    annexes,
  }

  const ar = {
    hero: {
      eyebrow: 'دليل إدارة المشاريع',
      title: 'تعلّم إدارة المشاريع',
      subtitle: 'واستعدّ لشهادة PMP',
      description: 'اثنا عشر فصلًا، من الأساسيات إلى القيادة بالمؤشرات. كل مفهوم في جدول أو قائمة أو مخطط لمراجعة سريعة. مجاني ودون تسجيل.',
      stats: [
        { value: '١٢', label: 'فصول' },
        { value: '٣٥', label: 'قسمًا' },
        { value: '٧٠', label: 'كتابًا مرجعيًا' },
        { value: '٣', label: 'لغات' },
      ],
      pills: ['PMBOK 7', 'PRINCE2', 'Scrum', 'Kanban', 'SAFe', 'Lean', 'Six Sigma', 'ADKAR'],
    },
    chapters: translateChapters('ar'),
    annexes,
  }

  const map = { fr, en, ar }
  return map[lang] || fr
}