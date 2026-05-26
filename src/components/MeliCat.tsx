import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface QuickReply {
  label: string;
  type?: "send" | "link";
  to?: string;
}

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  quickReplies?: QuickReply[];
}

/* ─────────────────────────────────────────────
 MOTEUR CONVERSATIONNEL PREMIUM
 Mémoire de contexte + détection d'intention
───────────────────────────────────────────── */

type ServiceType = "slides" | "documents" | "pack" | "surmesure";

interface ConvCtx {
  service: ServiceType | null;
  lastTopic: string | null;
}

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function detectService(t: string): ServiceType | null {
  if (
    t.match(
      /\bslide|presentat|pitch\b|powerpoint|pptx|\bppt\b|canva|support.*client|deck|formation.*support|support.*form/,
    )
  )
    return "slides";
  if (
    t.match(
      /\bdocument|rapport|ebook|e.book|livre.*digit|guide\b|dossier|fiche|bilan|livret|brochure/,
    )
  )
    return "documents";
  if (
    t.match(
      /\bpack\b|pack.up|logo\b|charte|identit|carte.*visite|branding|palette.*coul|graphi.*visuel/,
    )
  )
    return "pack";
  if (
    t.match(
      /sur.mesure|sur mesure|horaire|accompagn|personnalis|specifique|coaching|formation.*perso/,
    )
  )
    return "surmesure";
  return null;
}

type BotResponse = { text: string; newCtx: ConvCtx; quickReplies?: QuickReply[] };

/* ── Réponses déclenchées par quick replies ── */
const QUICK_REPLY_RESPONSES: Record<string, BotResponse> = {
  "Découvrir les prestations": {
    text: "MELIYA propose plusieurs types de créations :\n\n**Slides sur mesure**\nPrésentations professionnelles, commerciales ou supports de formation.\n\n**Pages sur mesure**\nRapports, ebooks, dossiers, livrets ou documents premium.\n\n**Pack identité visuelle**\nLogo, palette couleurs, mini charte, modèles et supports.\n\n**Refonte d'un document existant**\nTransformation visuelle d'un support déjà existant.",
    newCtx: { service: null, lastTopic: "prestations" },
    quickReplies: [
      { label: "Slides" },
      { label: "Documents" },
      { label: "Identité visuelle" },
      { label: "Refonte" },
    ],
  },
  Prestations: {
    text: "MELIYA propose plusieurs types de créations :\n\n**Slides sur mesure**\nPrésentations professionnelles, commerciales ou supports de formation.\n\n**Pages sur mesure**\nRapports, ebooks, dossiers, livrets ou documents premium.\n\n**Pack identité visuelle**\nLogo, palette couleurs, mini charte, modèles et supports.\n\n**Refonte d'un document existant**\nTransformation visuelle d'un support déjà existant.",
    newCtx: { service: null, lastTopic: "prestations" },
    quickReplies: [
      { label: "Slides" },
      { label: "Documents" },
      { label: "Identité visuelle" },
      { label: "Refonte" },
    ],
  },
  "Délais & accompagnement": {
    text: "**Délais moyens :**\n\n**Slides sur mesure**\n• 1 à 5 slides 2 à 4 jours ouvrés\n• 10 à 19 slides 5 à 8 jours ouvrés\n• 20 slides et + planning personnalisé\n\n**Documents sur mesure**\n• 1 à 10 pages 3 à 5 jours ouvrés\n• 10 à 20 pages 5 à 8 jours ouvrés\n• 20 pages et + planning personnalisé\n\n**Pack identité visuelle**\n• 7 à 14 jours ouvrés\n\nLes délais varient selon la complexité du projet et les retours.",
    newCtx: { service: null, lastTopic: "tarifs" },
    quickReplies: [
      { label: "Demander un devis", type: "link", to: "/contact" },
      { label: "Simulateur tarifaire", type: "link", to: "/simulateur" },
    ],
  },
  "Tarifs & délais": {
    text: "**Slides sur mesure**\n• 30€ / slide\n• 10 à 19 slides remise -10%\n• 20 à 29 slides remise -15%\n\n**Pages sur mesure**\n• 25€ / page\n• 10 à 19 pages remise -10%\n• 20 à 29 pages remise -15%\n\n**Délais moyens :**\n\nSlides 2 à 8 jours ouvrés selon le volume\nDocuments 3 à 8 jours ouvrés selon le volume\nPack identité 7 à 14 jours ouvrés",
    newCtx: { service: null, lastTopic: "tarifs" },
    quickReplies: [
      { label: "Simulateur tarifaire", type: "link", to: "/simulateur" },
      { label: "Contacter Meliya", type: "link", to: "/contact" },
    ],
  },
  "Organisation & supports": {
    text: "Voici comment se déroule un projet :\n\n1. Échange sur votre besoin\n2. Validation du style et du contenu\n3. Création du support\n4. Ajustements et retouches\n5. Livraison finale\n\n**3 retouches incluses**\nLivraison en formats adaptés\nValidation avant finalisation",
    newCtx: { service: null, lastTopic: "fonctionnement" },
    quickReplies: [{ label: "Quels formats ?" }, { label: "Quels délais ?" }],
  },
  Fonctionnement: {
    text: "Voici comment se déroule un projet :\n\n1. Échange sur votre besoin\n2. Validation du style et du contenu\n3. Création du support\n4. Ajustements et retouches\n5. Livraison finale\n\n**3 retouches incluses**\nLivraison en formats adaptés\nValidation avant finalisation",
    newCtx: { service: null, lastTopic: "fonctionnement" },
    quickReplies: [
      { label: "Combien de retouches ?" },
      { label: "Quels formats ?" },
      { label: "Quels délais ?" },
    ],
  },
  "Demander un devis": {
    text: "Pour obtenir un devis personnalisé, vous pouvez :\n\nUtiliser le simulateur pour une estimation instantanée\nEnvoyer votre demande via la page Contact\nMe décrire votre projet ici pour que je vous guide",
    newCtx: { service: null, lastTopic: "devis" },
    quickReplies: [
      { label: "Simulateur tarifaire", type: "link", to: "/simulateur" },
      { label: "Contacter Meliya", type: "link", to: "/contact" },
      { label: "Décrire mon projet" },
    ],
  },
  Slides: {
    text: "**Slides sur mesure** la spécialité de Meliya.\n\nPrésentations qui captent l'attention dès la première slide :\n• Structure narrative soignée\n• Design épuré et impactant\n• Canva ou PowerPoint\n• Livraison PDF + fichier source\n\n**30€ / slide** remises dès 10 slides\n2 à 8 jours ouvrés selon le volume",
    newCtx: { service: "slides", lastTopic: "slides" },
    quickReplies: [{ label: "Tarifs & délais" }, { label: "Demander un devis" }],
  },
  Documents: {
    text: "**Documents sur mesure** structure, soin et lisibilité.\n\n• Rapports et bilans professionnels\n• Ebooks et guides\n• Dossiers de présentation\n• PDF corporate\n\n**25€ / page** remises dès 10 pages\n3 à 8 jours ouvrés selon le volume",
    newCtx: { service: "documents", lastTopic: "documents" },
    quickReplies: [{ label: "Tarifs & délais" }, { label: "Demander un devis" }],
  },
  "Identité visuelle": {
    text: "**Pack identité visuelle** une image pro complète et cohérente.\n\n• Logo sur mesure\n• Palette de couleurs personnalisée\n• Mini charte graphique\n• Modèles et supports de base\n\nTarif sur devis selon les éléments demandés\n7 à 14 jours ouvrés",
    newCtx: { service: "pack", lastTopic: "pack" },
    quickReplies: [
      { label: "Demander un devis" },
      { label: "Contacter Meliya", type: "link", to: "/contact" },
    ],
  },
  Refonte: {
    text: "**Refonte de document existant** transformer un support déjà écrit en quelque chose de visuellement professionnel.\n\nVous avez le contenu Meliya s'occupe de la forme.\n\n• Mise en page repensée\n• Cohérence visuelle\n• Format livrable adapté",
    newCtx: { service: null, lastTopic: "refonte" },
    quickReplies: [{ label: "Tarifs & délais" }, { label: "Demander un devis" }],
  },
  "Combien de retouches ?": {
    text: "**3 séries de retouches** sont incluses dans chaque prestation.\n\nCela couvre les ajustements sur la mise en page, les couleurs, les textes et la structure.\n\nAu-delà, des retouches complémentaires sont possibles au tarif horaire.",
    newCtx: { service: null, lastTopic: "retouches" },
    quickReplies: [{ label: "Quels formats ?" }, { label: "Quels délais ?" }],
  },
  "Quels formats ?": {
    text: "Les fichiers sont livrés en formats directement utilisables :\n\n• **Slides** PDF + PPTX ou Canva\n• **Documents** PDF + DOCX sur demande\n• **Pack identité** tous fichiers sources (AI, PNG, PDF)\n\nVous précisez vos préférences dans le brief, Meliya s'adapte.",
    newCtx: { service: null, lastTopic: "formats" },
    quickReplies: [{ label: "Quels délais ?" }, { label: "Demander un devis" }],
  },
  "Quels délais ?": {
    text: "**Délais moyens :**\n\nSlides sur mesure\n• 1 à 5 slides 2 à 4 jours ouvrés\n• 10 à 19 slides 5 à 8 jours ouvrés\n• 20 slides et + planning personnalisé\n\nDocuments sur mesure\n• 1 à 10 pages 3 à 5 jours ouvrés\n• 10 à 20 pages 5 à 8 jours ouvrés\n\nPack identité visuelle\n• 7 à 14 jours ouvrés",
    newCtx: { service: null, lastTopic: "delais" },
    quickReplies: [
      { label: "Demander un devis" },
      { label: "Contacter Meliya", type: "link", to: "/contact" },
    ],
  },
  "Décrire mon projet": {
    text: "Décrivez-moi votre projet.\n\nQuel type de support souhaitez-vous ?\nQuel est l'objectif de ce support ?\nAvez-vous déjà du contenu ou partez-vous de zéro ?",
    newCtx: { service: null, lastTopic: "projet" },
  },
  "Simulateur tarifaire": {
    text: "Le simulateur vous donne une estimation instantanée selon le type de support et le volume.\n\nRendez-vous sur la page Simulateur accessible depuis le menu de navigation.",
    newCtx: { service: null, lastTopic: "simulateur" },
    quickReplies: [{ label: "Simulateur", type: "link", to: "/simulateur" }],
  },
  "Contacter Meliya": {
    text: "Vous pouvez contacter Meliya directement via la page Contact.\n\nElle répond sous **24h** et vous envoie un devis personnalisé gratuitement.",
    newCtx: { service: null, lastTopic: "contact" },
    quickReplies: [{ label: "Page Contact", type: "link", to: "/contact" }],
  },
};

function getResponse(input: string, ctx: ConvCtx): BotResponse {
  const exact = QUICK_REPLY_RESPONSES[input.trim()];
  if (exact) return exact;

  const t = norm(input);
  const detectedService = detectService(t);
  const activeService: ServiceType | null = detectedService ?? ctx.service;
  const newCtx: ConvCtx = { service: activeService, lastTopic: ctx.lastTopic };

  const wantsDelai =
    /delai|livr|temps|rapide|vite|quand|combien.*temps|en combien|urgent|express/.test(t);
  const wantsTarif = /prix|tarif|cout|combien|budget|\beuro|\€|cher|gratuit|simulat/.test(t);
  const wantsRetouche = /retouche|modif|correction|ajust|revision|reprend|chang/.test(t);
  const wantsFormat =
    /format|fichier|modifiable|editable|editer|source|pptx|docx|livr.*quoi|ce.*que.*tu.*livr/.test(
      t,
    );
  const wantsCanva = /canva|powerpoint|google.*slide|keynote|outil|logiciel/.test(t);
  const wantsUrgence = /urgent|urgence|rapidement|vite\b|asap|express|demain|aujourd/.test(t);
  const wantsContact =
    /contact|joindre|mail|email|appel|telephone|message|repondr|devis|commande|rdv/.test(t);
  const wantsAbout =
    /qui.*meliya|c'est qui|qui est|a propos|qui.*toi|presentat.*toi|experience/.test(t);
  const wantsRemote =
    /distance|remote|enligne|en ligne|france|lieu|ou.*est|localisation|deplacement/.test(t);
  const wantsConfid = /confidential|secret|nda|discret|priv/.test(t);
  const wantsSurMes = /sur.mesure|personnalis|specifique|besoin.*particulier|accompagn/.test(t);
  const wantsEbook = /ebook|e.book|livre.*digit|livre.*num|guide.*telecharg/.test(t);
  const wantsPitch = /pitch|investor|investisseur|levee.*fond|startup|fundrais/.test(t);
  const wantsIndep = /independant|freelance|auto.entrepreneur|solopreneur|consultant|coach/.test(t);
  const wantsPremium = /premium|haut.*gamme|luxe|qualite.*pro|impression/.test(t);
  const isGreeting = /^(bonjour|salut|hello|coucou|hey|bonsoir|hi\b|slt|bjr)/.test(t.trim());
  const isThanks = /merci|super|parfait|genial|top\b|cool|nickel|bravo|excellent|impec/.test(t);
  const wantsAll =
    /toutes.*prestat|toutes.*offres|tout.*ce.*que|ce.*que.*vous.*faites|liste.*prestat/.test(t);

  if (isGreeting && !detectedService && !wantsTarif && !wantsDelai)
    return {
      text: "Bonjour. Ravie de vous accueillir.\n\nJe suis l'assistante MELIYA, spécialisée en création de **documents et supports visuels premium**.\n\nJe peux vous aider à :\n• découvrir les prestations\n• connaître les tarifs et délais\n• estimer ou démarrer votre projet\n\nComment puis-je vous aider ?",
      newCtx: { service: null, lastTopic: "about" },
      quickReplies: [
        { label: "Découvrir les prestations" },
        { label: "Tarifs & délais" },
        { label: "Demander un devis" },
      ],
    };

  if (isThanks)
    return {
      text: "Avec plaisir. C'est exactement pour cela que je suis disponible.\n\nSi vous avez d'autres questions ou souhaitez avancer sur votre projet, n'hésitez pas.\n\nMeliya répond également directement sous 24h via la page Contact.",
      newCtx,
    };

  if (wantsAbout && !detectedService)
    return {
      text: "Meliya est une **assistante digitale** spécialisée dans la création de documents et supports visuels premium.\n\nElle travaille **100% à distance** avec des clients partout en France.\n\nSon expertise :\n• slides professionnels (Canva, PowerPoint)\n• documents soignés (rapports, ebooks, guides)\n• identité visuelle complète\n• accompagnement sur-mesure\n\nSon objectif : **valoriser votre image professionnelle** avec des créations qui font la différence.",
      newCtx: { ...newCtx, lastTopic: "about" },
    };

  if (wantsRemote)
    return {
      text: "Meliya travaille **100% à distance**.\n\nElle est basée en France et collabore avec ses clients entièrement en ligne brief, échanges, livraison numérique.\n\nTout se passe de façon fluide et professionnelle, sans déplacement.",
      newCtx,
    };

  if (wantsConfid)
    return {
      text: "La confidentialité est une priorité pour Meliya.\n\nVos contenus, données et projets restent strictement confidentiels. Elle travaille avec discrétion et professionnalisme aucun projet n'est partagé ni utilisé sans accord explicite.\n\nUn NDA peut être établi sur demande.",
      newCtx,
    };

  if (wantsIndep && !detectedService)
    return {
      text: "Meliya travaille régulièrement avec des **indépendants, freelances et consultants**.\n\nSes créations sont particulièrement adaptées pour :\n• valoriser votre offre et votre expertise\n• impressionner vos clients dès la première slide\n• soigner votre image de professionnel\n\nQue vous ayez besoin d'une présentation client, d'un ebook ou d'une identité visuelle elle s'adapte à votre budget et votre rythme.",
      newCtx: { ...newCtx, lastTopic: "general" },
    };

  if (wantsPremium && !detectedService)
    return {
      text: "C'est exactement la philosophie de Meliya créer des supports qui **inspirent confiance** dès le premier regard.\n\nChaque création est pensée pour être :\n• esthétiquement soignée\n• professionnellement structurée\n• à votre image et cohérente\n\nLe niveau premium est la norme, pas l'exception.",
      newCtx,
    };

  if (wantsAll && !wantsTarif && !wantsDelai)
    return {
      text: "Voici ce que MELIYA propose :\n\n**Slides premium**\nPrésentations, pitch decks, supports Canva / PowerPoint\n30€ / slide\n\n**Documents premium**\nRapports, ebooks, guides, PDF professionnels\n25€ / page\n\n**Pack identité**\nLogo, palette, mini charte, cartes de visite\n579€\n\n**Accompagnement sur-mesure**\nProjet personnalisé, coaching, multi-supports\n60€ / h\n\nPacks dégressifs disponibles sur slides et documents.",
      newCtx: { ...newCtx, lastTopic: "all" },
    };

  if (wantsEbook)
    return {
      text: "Un ebook professionnel est tout à fait dans le domaine de Meliya.\n\nElle peut créer un ebook :\n• élégant, lisible et bien structuré\n• mis en page avec soin\n• livré en **PDF** prêt à diffuser\n\n**25€ / page** packs dégressifs disponibles\nLivraison en 2 à 5 jours selon le volume",
      newCtx: { service: "documents", lastTopic: "documents" },
    };

  if (wantsPitch)
    return {
      text: "Un pitch deck est une spécialité de Meliya.\n\nElle crée des présentations qui **racontent une histoire** et captent l'attention dès la première slide.\n\n• Structure narrative soignée\n• Design épuré et impactant\n• Mise en valeur des chiffres clés\n• Format PowerPoint ou Canva\n\n**30€ / slide**\nLivraison en 2 à 5 jours",
      newCtx: { service: "slides", lastTopic: "slides" },
    };

  if (wantsUrgence && !detectedService)
    return {
      text: "Pour les demandes urgentes, Meliya fait de son mieux selon ses disponibilités.\n\nEn général :\n• les projets simples peuvent être livrés en **48h**\n• les délais express sont possibles selon le planning\n\nLe mieux est de la contacter directement via la page Contact pour confirmer la faisabilité elle répond sous 24h.",
      newCtx: { ...newCtx, lastTopic: "urgence" },
    };

  if (wantsRetouche)
    return {
      text: "Les **retouches et ajustements** font partie du process de Meliya.\n\nElle travaille sur la base d'un brief initial, propose une version pour validation, puis affine selon vos retours.\n\n**3 séries de retouches incluses** dans le tarif. Pour des modifications importantes après livraison finale, elles sont traitées en sur-mesure à 60€/h.",
      newCtx: { ...newCtx, lastTopic: "retouches" },
    };

  if (wantsFormat) {
    let text = "";
    if (activeService === "slides")
      text =
        "Pour les **slides**, les fichiers sont livrés en :\n• **PDF** version finale de présentation\n• **PPTX** ou **Canva** pour modification autonome\n\nVous précisez votre outil préféré dans le brief, Meliya s'adapte.";
    else if (activeService === "documents")
      text =
        "Pour les **documents**, les fichiers sont livrés en :\n• **PDF** version finale prête à partager\n• **DOCX** sur demande pour modifier le contenu vous-même";
    else if (activeService === "pack")
      text =
        "Pour le **Pack identité**, tous les fichiers sources sont livrés :\n• Logo en **AI**, **PNG** et **PDF**\n• Charte graphique en **PDF**\n• Carte de visite en fichier imprimable\n• Templates en format éditable";
    else
      text =
        "Les fichiers livrés par Meliya sont conçus pour être **directement utilisables**.\n\n• **Slides** PDF + PPTX ou Canva\n• **Documents** PDF + DOCX sur demande\n• **Pack identité** tous fichiers sources (AI, PNG, PDF)";
    return { text, newCtx: { service: activeService, lastTopic: "formats" } };
  }

  if (wantsCanva)
    return {
      text: "Meliya travaille sur **Canva et PowerPoint** selon votre préférence.\n\n• **Canva** idéal pour modifier facilement vous-même\n• **PowerPoint (PPTX)** parfait pour les environnements corporate\n\nVous indiquez votre outil de prédilection dans le brief.",
      newCtx: { service: "slides", lastTopic: "canva" },
    };

  if (wantsDelai && !detectedService && activeService) {
    let text = "";
    if (activeService === "slides")
      text =
        "Pour les **slides**, les délais sont :\n\n• Présentation simple (5-10 slides) 2 à 3 jours\n• Présentation complète (10-20 slides) 3 à 5 jours\n• Express selon disponibilités\n\nLe délai exact est précisé dans votre devis.";
    else if (activeService === "documents")
      text =
        "Pour les **documents**, les délais dépendent du volume :\n\n• Document court (1-5 pages) 48h à 3 jours\n• Document long (10+ pages) 3 à 7 jours\n• Express selon disponibilités";
    else if (activeService === "pack")
      text =
        "Le **Pack identité** est un projet complet comptez environ **10 jours ouvrés**.\n\nCe délai comprend le brief, la création, les ajustements et la livraison des fichiers sources.";
    else if (activeService === "surmesure")
      text =
        "Pour les prestations **sur-mesure**, les délais sont définis ensemble selon votre projet.\n\nMeliya commence toujours par un échange pour comprendre vos besoins.";
    return { text, newCtx: { service: activeService, lastTopic: "delais" } };
  }

  if (wantsTarif && !detectedService && activeService) {
    let text = "";
    if (activeService === "slides")
      text =
        "Pour les **slides premium** :\n\n• **30€ / slide**\n• Remise -10% dès 15 slides\n• Remise -20% dès 30 slides\n\nLe tarif inclut structure, design, typographie et mise en page.";
    else if (activeService === "documents")
      text =
        "Pour les **documents premium** :\n\n• **25€ / page**\n• Remise -10% dès 15 pages\n• Remise -20% dès 30 pages\n\nLe tarif inclut mise en page, hiérarchie visuelle et éléments graphiques.";
    else if (activeService === "pack")
      text =
        "Le **Pack identité** est à **579€**.\n\nTarif tout compris pour : logo, palette, mini charte, carte de visite et templates.";
    else if (activeService === "surmesure")
      text =
        "Les prestations **sur-mesure** sont facturées **60€/h**.\n\nMeliya commence par un échange, puis propose un devis horaire estimatif.";
    return { text, newCtx: { service: activeService, lastTopic: "tarifs" } };
  }

  if (activeService === "slides") {
    let text = "";
    if (wantsTarif)
      text =
        "Pour les **slides premium** :\n\n• **30€ / slide**\n• Remise -10% dès 15 slides\n• Remise -20% dès 30 slides\n\nLivraison PDF + fichier source (Canva ou PPTX).";
    else if (wantsDelai)
      text =
        "Pour les **slides**, les délais sont :\n\n• Présentation simple (5-10 slides) 2 à 3 jours\n• Présentation complète (10-20+ slides) 3 à 5 jours\n• Express selon disponibilités";
    else
      text =
        "Les **slides premium** de Meliya sont idéaux pour :\n• présentations clients percutantes\n• pitch decks structurés\n• formations et supports pédagogiques\n\nMeliya prend en charge structure, lisibilité et esthétique.\n\n**30€ / slide** packs dégressifs disponibles\nLivraison en 2 à 5 jours";
    return {
      text,
      newCtx: {
        service: "slides",
        lastTopic: wantsTarif ? "tarifs" : wantsDelai ? "delais" : "slides",
      },
    };
  }

  if (activeService === "documents") {
    let text = "";
    if (wantsTarif)
      text =
        "Pour les **documents premium** :\n\n• **25€ / page**\n• Remise -10% dès 15 pages\n• Remise -20% dès 30 pages\n\nLivraison PDF + DOCX sur demande.";
    else if (wantsDelai)
      text =
        "Pour les **documents**, le délai dépend du volume :\n\n• 1 à 5 pages 48h à 3 jours\n• 10+ pages 3 à 7 jours\n• Express selon disponibilités";
    else
      text =
        "Les **documents premium** couvrent tout ce qui nécessite structure, soin et lisibilité :\n• rapports et bilans professionnels\n• ebooks et guides\n• dossiers de présentation\n• PDF corporate\n\n**25€ / page** packs dégressifs disponibles\nLivraison en 2 à 5 jours";
    return {
      text,
      newCtx: {
        service: "documents",
        lastTopic: wantsTarif ? "tarifs" : wantsDelai ? "delais" : "documents",
      },
    };
  }

  if (activeService === "pack") {
    let text = "";
    if (wantsTarif)
      text =
        "Le **Pack identité** est à **579€** tout compris.\n\n• Logo sur mesure\n• Palette de couleurs personnalisée\n• Mini charte graphique\n• Carte de visite\n• Templates de base";
    else if (wantsDelai)
      text =
        "Le **Pack identité** est un projet complet comptez environ **10 jours ouvrés**.\n\nCe délai comprend brief, création, ajustements et livraison des fichiers sources.";
    else
      text =
        "Le **Pack identité** est une offre complète pour construire une image pro cohérente :\n\n• Logo sur mesure\n• Palette de couleurs personnalisée\n• Mini charte graphique\n• Carte de visite\n• Templates de base\n\n**579€** tout compris\nLivraison en ~10 jours ouvrés";
    return {
      text,
      newCtx: {
        service: "pack",
        lastTopic: wantsTarif ? "tarifs" : wantsDelai ? "delais" : "pack",
      },
    };
  }

  if (activeService === "surmesure" || wantsSurMes) {
    let text = "";
    if (wantsTarif)
      text =
        "Les prestations **sur-mesure** sont facturées **60€/h**.\n\nMeliya commence par un échange pour comprendre votre projet, puis propose un devis horaire estimatif.";
    else
      text =
        "Les prestations **sur-mesure** sont pour les projets qui nécessitent un accompagnement personnalisé :\n\n• Projets complexes ou atypiques\n• Accompagnement de A à Z\n• Formation ou coaching\n• Projets multi-supports\n\n**60€/h** devis estimatif gratuit";
    return {
      text,
      newCtx: { service: "surmesure", lastTopic: wantsTarif ? "tarifs" : "surmesure" },
    };
  }

  if (wantsTarif)
    return {
      text: "Aperçu des tarifs :\n\n• **Slides** 30€ / slide\n• **Documents** 25€ / page\n• **Pack identité** 579€\n• **Sur-mesure** 60€/h\n\nRemises dégressives sur slides et documents :\n→ -10% dès 15 unités\n→ -20% dès 30 unités\n\nLe Simulateur vous donne une estimation en quelques secondes.",
      newCtx: { ...newCtx, lastTopic: "tarifs" },
      quickReplies: [{ label: "Simulateur tarifaire", type: "link", to: "/simulateur" }],
    };

  if (wantsDelai)
    return {
      text: "Les délais varient selon la prestation :\n\n• **Slides** 2 à 5 jours\n• **Documents** 48h à 7 jours\n• **Pack identité** ~10 jours ouvrés\n• **Sur-mesure** délai défini ensemble\n\nPour les projets urgents, Meliya fait de son mieux selon ses disponibilités.",
      newCtx: { ...newCtx, lastTopic: "delais" },
    };

  if (wantsContact)
    return {
      text: "Pour contacter Meliya directement :\n\nRendez-vous sur la page **Contact** elle répond sous **24h** et vous envoie un devis personnalisé gratuitement.\n\nVous pouvez aussi utiliser le **Simulateur** pour une estimation instantanée.",
      newCtx: { ...newCtx, lastTopic: "contact" },
      quickReplies: [
        { label: "Contacter Meliya", type: "link", to: "/contact" },
        { label: "Simulateur tarifaire", type: "link", to: "/simulateur" },
      ],
    };

  if (/exemple|portfolio|realisation|travail.*meli|voir.*creat|inspiration/.test(t))
    return {
      text: "Pour découvrir des exemples de créations, je vous invite à explorer la page **Prestations** du site.\n\nChaque projet reflète l'attention au détail et la touche premium de Meliya.",
      newCtx,
    };

  return {
    text: "Je n'ai pas saisi entièrement votre demande.\n\nJe peux vous aider sur :\n• les **prestations** (slides, documents, identité, sur-mesure)\n• les **tarifs** et délais\n• le **fonctionnement** et les livrables\n• **contacter Meliya** ou demander un devis\n\nN'hésitez pas à reformuler ou à choisir une option.",
    newCtx,
    quickReplies: [
      { label: "Découvrir les prestations" },
      { label: "Tarifs & délais" },
      { label: "Demander un devis" },
    ],
  };
}

/* ─────────────────────────────────────────────────────────────── */

export function MeliCat() {
  const [open, setOpen] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [convCtx, setConvCtx] = useState<ConvCtx>({ service: null, lastTopic: null });

  const INITIAL_MESSAGES: Message[] = [
    {
      id: 0,
      from: "bot",
      text: "Bonjour,\n\nJe suis l'assistante MELIYA. Je suis à votre disposition pour vous guider dans la découverte de nos prestations, l'obtention d'un devis ou toute question sur votre projet.\n\nComment puis-je vous aider ?",
      quickReplies: [
        { label: "Découvrir les prestations" },
        { label: "Demander un devis" },
        { label: "Organisation & supports" },
        { label: "Délais & accompagnement" },
      ],
    },
  ];

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Greeting delay */
  useEffect(() => {
    const t1 = setTimeout(() => setGreetingVisible(true), 2200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!greetingVisible) return;
    const t = setTimeout(() => setGreetingVisible(false), 9000);
    return () => clearTimeout(t);
  }, [greetingVisible]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  /* Scroll isolation */
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const stopWheel = (e: WheelEvent) => e.stopPropagation();
    const stopTouch = (e: TouchEvent) => e.stopPropagation();
    el.addEventListener("wheel", stopWheel, { passive: true });
    el.addEventListener("touchmove", stopTouch, { passive: true });
    return () => {
      el.removeEventListener("wheel", stopWheel);
      el.removeEventListener("touchmove", stopTouch);
    };
  }, []);

  function resetConversation() {
    setMessages(INITIAL_MESSAGES);
    setConvCtx({ service: null, lastTopic: null });
    setInput("");
    setTyping(false);
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: text.trim() }]);
    setInput("");
    setTyping(true);
    const currentCtx = convCtx;
    const delay = 800 + Math.random() * 500;
    setTimeout(() => {
      setTyping(false);
      const { text: responseText, newCtx, quickReplies } = getResponse(text, currentCtx);
      setConvCtx(newCtx);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: responseText, quickReplies },
      ]);
    }, delay);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function formatText(text: string) {
    return text.split("\n").map((line, i, arr) => {
      const parts = line.split(/\*\*(.+?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((p, j) =>
            j % 2 === 1 ? (
              <strong key={j} style={{ fontWeight: 500, letterSpacing: "0.01em" }}>
                {p}
              </strong>
            ) : (
              p
            ),
          )}
          {i < arr.length - 1 && <br />}
        </span>
      );
    });
  }

  const now = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  /* Quick reply item shared style */
  const qrBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    background: "transparent",
    border: "0.5px solid rgba(201,169,110,0.28)",
    borderRadius: "8px",
    fontSize: "10.5px",
    fontFamily: "var(--font-light)",
    fontWeight: 300,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#5E5248",
    cursor: "pointer",
    textAlign: "left" as const,
    textDecoration: "none",
    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
    width: "100%",
  };

  function onQrEnter(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.background = "rgba(201,169,110,0.06)";
    el.style.borderColor = "rgba(201,169,110,0.52)";
    el.style.transform = "translateX(3px)";
    el.style.color = "#4A2E60";
  }
  function onQrLeave(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.background = "transparent";
    el.style.borderColor = "rgba(201,169,110,0.28)";
    el.style.transform = "translateX(0)";
    el.style.color = "#5E5248";
  }

  return (
    <>
      {/* ═══════════════════════════════════════
 LUXURY CONCIERGE PANEL
 ═══════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: "88px",
          right: "24px",
          width: "clamp(320px, 90vw, 386px)",
          maxHeight: "clamp(500px, 82vh, 610px)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          background: "rgba(255,252,248,0.98)",
          backdropFilter: "blur(48px)",
          WebkitBackdropFilter: "blur(48px)",
          border: "0.5px solid rgba(201,169,110,0.25)",
          boxShadow: [
            "0 0 0 0.5px rgba(201,169,110,0.1)",
            "0 4px 16px rgba(74,46,96,0.05)",
            "0 20px 60px rgba(74,46,96,0.11)",
            "0 60px 120px rgba(74,46,96,0.06)",
            "inset 0 1px 0 rgba(255,255,255,0.92)",
          ].join(", "),
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(22px) scale(0.97)",
          pointerEvents: open ? "all" : "none",
          transition:
            "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          transformOrigin: "bottom right",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            padding: "18px 20px 16px",
            background: "rgba(255,252,248,0.99)",
            display: "flex",
            alignItems: "center",
            borderBottom: "0.5px solid rgba(201,169,110,0.14)",
            flexShrink: 0,
          }}
        >
          {/* Brand identity */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#4A2E60",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: "7px",
              }}
            >
              MELIYA
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(201,169,110,0.7)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-light)",
                  fontWeight: 300,
                  fontSize: "9.5px",
                  color: "rgba(74,46,96,0.4)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Assistante disponible
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={resetConversation}
              title="Nouvelle conversation"
              style={{
                width: "28px",
                height: "28px",
                background: "transparent",
                border: "0.5px solid rgba(201,169,110,0.22)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(74,46,96,0.35)",
                fontSize: "14px",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,169,110,0.55)";
                el.style.color = "rgba(74,46,96,0.75)";
                el.style.transform = "rotate(180deg)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,169,110,0.22)";
                el.style.color = "rgba(74,46,96,0.35)";
                el.style.transform = "rotate(0)";
              }}
            >
              ↺
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: "28px",
                height: "28px",
                background: "transparent",
                border: "0.5px solid rgba(201,169,110,0.22)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(74,46,96,0.35)",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,169,110,0.55)";
                el.style.color = "rgba(74,46,96,0.75)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,169,110,0.22)";
                el.style.color = "rgba(74,46,96,0.35)";
              }}
            >
              <X size={11} />
            </button>
          </div>
        </div>

        {/* ── MESSAGES ── */}
        <div
          ref={messagesContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 18px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            scrollbarWidth: "none",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            background: "rgba(253,250,247,0.4)",
          }}
        >
          {messages.map((msg, msgIdx) => (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Message bubble */}
              <div
                style={{
                  display: "flex",
                  flexDirection: msg.from === "user" ? "row-reverse" : "row",
                  animation: "melicat-msg-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <div
                  style={{
                    maxWidth: "84%",
                    padding: "14px 18px",
                    borderRadius: msg.from === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    background:
                      msg.from === "bot"
                        ? "rgba(255,252,248,0.97)"
                        : "linear-gradient(135deg, #5C3872 0%, #7B4C90 100%)",
                    border: msg.from === "bot" ? "0.5px solid rgba(201,169,110,0.14)" : "none",
                    boxShadow:
                      msg.from === "bot"
                        ? "0 2px 14px rgba(74,46,96,0.05), 0 8px 28px rgba(74,46,96,0.04), inset 0 1px 0 rgba(255,255,255,0.92)"
                        : "0 4px 20px rgba(92,56,114,0.22), 0 12px 40px rgba(92,56,114,0.12)",
                    fontSize: "12.5px",
                    lineHeight: 1.75,
                    color: msg.from === "bot" ? "#4A2E60" : "#FAF8F5",
                    fontFamily: "var(--font-light)",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                  }}
                >
                  {formatText(msg.text)}
                  <div
                    style={{
                      fontSize: "9px",
                      marginTop: "6px",
                      opacity: 0.28,
                      textAlign: "right",
                      fontFamily: "var(--font-light)",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {now}
                  </div>
                </div>
              </div>

              {/* Quick replies only on last bot message */}
              {msg.from === "bot" &&
                msg.quickReplies &&
                msg.quickReplies.length > 0 &&
                msgIdx === messages.length - 1 &&
                !typing && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      animation: "melicat-msg-in 0.55s cubic-bezier(0.22,1,0.36,1) both",
                      animationDelay: "0.2s",
                    }}
                  >
                    {msg.quickReplies.map((qr) =>
                      qr.type === "link" ? (
                        <Link
                          key={qr.label}
                          to={qr.to as string}
                          style={qrBaseStyle}
                          onMouseEnter={onQrEnter}
                          onMouseLeave={onQrLeave}
                        >
                          <span>{qr.label}</span>
                          <span style={{ opacity: 0.35, fontSize: "10px", fontWeight: 300 }}>
                            →
                          </span>
                        </Link>
                      ) : (
                        <button
                          key={qr.label}
                          onClick={() => sendMessage(qr.label)}
                          style={qrBaseStyle}
                          onMouseEnter={onQrEnter}
                          onMouseLeave={onQrLeave}
                        >
                          <span>{qr.label}</span>
                          <span style={{ opacity: 0.35, fontSize: "10px", fontWeight: 300 }}>
                            →
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div
              style={{
                display: "flex",
                animation: "melicat-msg-in 0.4s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  background: "rgba(255,252,248,0.97)",
                  border: "0.5px solid rgba(201,169,110,0.14)",
                  borderRadius: "4px 14px 14px 14px",
                  boxShadow: "0 2px 14px rgba(74,46,96,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "rgba(74,46,96,0.28)",
                      display: "inline-block",
                      animation: `melicat-dot 1.3s ease-in-out ${i * 0.18}s infinite`,
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── INPUT ── */}
        <div
          style={{
            padding: "12px 16px 16px",
            borderTop: "0.5px solid rgba(201,169,110,0.12)",
            background: "rgba(255,252,248,0.99)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px 10px 16px",
              background: "rgba(250,247,243,0.7)",
              border: "0.5px solid rgba(201,169,110,0.2)",
              borderRadius: "10px",
              transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Votre message…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "12.5px",
                fontFamily: "var(--font-light)",
                fontWeight: 300,
                color: "#4A2E60",
                letterSpacing: "0.025em",
                lineHeight: 1.5,
              }}
              onFocus={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.borderColor = "rgba(201,169,110,0.48)";
                  parent.style.boxShadow = "0 0 0 3px rgba(201,169,110,0.07)";
                }
              }}
              onBlur={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.borderColor = "rgba(201,169,110,0.2)";
                  parent.style.boxShadow = "none";
                }
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              style={{
                width: "30px",
                height: "30px",
                flexShrink: 0,
                background: input.trim() ? "rgba(74,46,96,0.88)" : "transparent",
                border: `0.5px solid ${input.trim() ? "transparent" : "rgba(201,169,110,0.25)"}`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "default",
                color: input.trim() ? "#FAF8F5" : "rgba(74,46,96,0.28)",
                fontSize: "15px",
                lineHeight: 1,
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: input.trim() ? "0 2px 12px rgba(74,46,96,0.22)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!input.trim()) return;
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1.08)";
                el.style.boxShadow = "0 4px 20px rgba(74,46,96,0.32)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1)";
                el.style.boxShadow = input.trim() ? "0 2px 12px rgba(74,46,96,0.22)" : "none";
              }}
            >
              →
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "9px",
              fontSize: "8.5px",
              fontFamily: "var(--font-light)",
              fontWeight: 300,
              letterSpacing: "0.15em",
              color: "rgba(74,46,96,0.18)",
              textTransform: "uppercase",
            }}
          >
            MELIYA · Assistante digitale
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
 GREETING CARD
 ═══════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          zIndex: 998,
          opacity: greetingVisible && !open ? 1 : 0,
          transform:
            greetingVisible && !open ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
          transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: greetingVisible && !open ? "auto" : "none",
        }}
      >
        <div
          onClick={() => {
            setGreetingVisible(false);
            setOpen(true);
          }}
          style={{
            background: "rgba(255,252,248,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "0.5px solid rgba(201,169,110,0.25)",
            borderRadius: "14px 14px 4px 14px",
            padding: "16px 20px",
            cursor: "pointer",
            maxWidth: "230px",
            boxShadow: [
              "0 4px 20px rgba(74,46,96,0.09)",
              "0 16px 48px rgba(74,46,96,0.07)",
              "inset 0 1px 0 rgba(255,255,255,0.92)",
            ].join(", "),
            transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow =
              "0 8px 32px rgba(74,46,96,0.13), 0 24px 64px rgba(74,46,96,0.09), inset 0 1px 0 rgba(255,255,255,0.92)";
            el.style.borderColor = "rgba(201,169,110,0.42)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow =
              "0 4px 20px rgba(74,46,96,0.09), 0 16px 48px rgba(74,46,96,0.07), inset 0 1px 0 rgba(255,255,255,0.92)";
            el.style.borderColor = "rgba(201,169,110,0.25)";
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              width: "24px",
              height: "0.5px",
              background: "linear-gradient(90deg, rgba(201,169,110,0.6), transparent)",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "13px",
              color: "#4A2E60",
              letterSpacing: "0.02em",
              lineHeight: 1.55,
              marginBottom: "8px",
            }}
          >
            Bonjour puis-je vous accompagner ?
          </div>
          <div
            style={{
              fontSize: "9px",
              fontFamily: "var(--font-light)",
              fontWeight: 300,
              letterSpacing: "0.14em",
              color: "rgba(74,46,96,0.32)",
              textTransform: "uppercase",
            }}
          >
            Assistante MELIYA
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
 LUXURY TRIGGER BUTTON
 ═══════════════════════════════════════ */}
      <button
        onClick={() => {
          setGreetingVisible(false);
          setOpen(!open);
        }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "11px",
          padding: "11px 20px 11px 14px",
          background: "rgba(255,252,248,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "0.5px solid rgba(201,169,110,0.32)",
          borderRadius: "100px",
          cursor: "pointer",
          boxShadow: [
            "0 2px 8px rgba(74,46,96,0.07)",
            "0 10px 36px rgba(74,46,96,0.11)",
            "inset 0 1px 0 rgba(255,255,255,0.96)",
          ].join(", "),
          transition: "all 0.48s cubic-bezier(0.22,1,0.36,1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow =
            "0 4px 16px rgba(74,46,96,0.10), 0 18px 52px rgba(74,46,96,0.14), inset 0 1px 0 rgba(255,255,255,0.96)";
          el.style.borderColor = "rgba(201,169,110,0.52)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow =
            "0 2px 8px rgba(74,46,96,0.07), 0 10px 36px rgba(74,46,96,0.11), inset 0 1px 0 rgba(255,255,255,0.96)";
          el.style.borderColor = "rgba(201,169,110,0.32)";
        }}
      >
        {/* M monogram */}
        <span
          style={{
            width: "30px",
            height: "30px",
            background:
              "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.06) 100%)",
            border: "0.5px solid rgba(201,169,110,0.38)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-heading)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#C9A96E",
            flexShrink: 0,
            letterSpacing: "0.05em",
          }}
        >
          M
        </span>
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-light)",
            fontWeight: 300,
            fontSize: "10.5px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5E5248",
            whiteSpace: "nowrap",
          }}
        >
          {open ? "Fermer" : "Bonjour"}
        </span>
      </button>
    </>
  );
}
