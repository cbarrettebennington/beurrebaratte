/* =====================================================================
   MENU DU MOMENT — c'est le seul fichier à modifier quand le menu change.

   1. Remplacez les images par les nouvelles (gardez les mêmes noms) :
        menu/menu-fr.jpg  → page française
        menu/menu-en.jpg  → page anglaise
   2. Changez la date ci-dessous (format AAAA-MM-JJ).
   3. Modifiez les notes au besoin. Le texte va entre les accents graves ` `.
      Laissez une ligne vide pour commencer un nouveau paragraphe.

   Plusieurs images (ex. menu + carte des vins) ? Ajoutez-les à la liste :
      images_fr: ["menu/menu-fr.jpg", "menu/vins-fr.jpg"],

   Pas encore de version anglaise ? Supprimez la ligne images_en :
   la page anglaise affichera alors l'image française.
   ===================================================================== */

window.MENU = {
  date: "2026-09-23",

  images_fr: ["menu/menu-fr.jpg"],
  images_en: ["menu/menu-en.jpg"],

  note_fr: `
Notre menu change au fil des saisons et des arrivages de nos producteurs. Voici celui de la semaine.

Certains plats peuvent s’épuiser en cours de soirée. Pour les allergies et restrictions, avisez-nous lors de la réservation.
`,

  note_en: `
Our menu changes with the seasons and with what our producers bring in. Here is this week’s.

Some dishes may sell out during the evening. For allergies and dietary restrictions, please let us know when you book.
`
};
