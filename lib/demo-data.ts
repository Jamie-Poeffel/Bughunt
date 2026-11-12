export type BugStatus = "Open" | "In progress" | "Resolved";
export type Bug = { id: string; title: string; project: string; projectColor: string; status: BugStatus; priority: "Critical" | "High" | "Medium" | "Low"; reporter: string; date: string; category: string };
export const projects = [
 { name: "Parkour Baar", slug: "parkour-baar", initials: "PB", color: "#477a63", reports: 18, open: 6 },
 { name: "Circle", slug: "circle", initials: "C", color: "#8b78b8", reports: 12, open: 4 },
 { name: "VictoBlade", slug: "victoblade", initials: "VB", color: "#c17a4c", reports: 9, open: 3 },
];
export const bugs: Bug[] = [
 {id:"BUG-024",title:"Login schlägt nach Session-Timeout fehl",project:"Parkour Baar",projectColor:"#477a63",status:"In progress",priority:"High",reporter:"Luca Meier",date:"Vor 12 Min.",category:"Authentifizierung"},
 {id:"BUG-023",title:"Bilder werden auf Mobile abgeschnitten",project:"Circle",projectColor:"#8b78b8",status:"Open",priority:"Medium",reporter:"Sarah K.",date:"Vor 38 Min.",category:"Darstellung"},
 {id:"BUG-022",title:"Scan-Ergebnis lädt endlos",project:"VictoBlade",projectColor:"#c17a4c",status:"Open",priority:"Critical",reporter:"Anonym",date:"Vor 1 Std.",category:"Funktionalität"},
 {id:"BUG-021",title:"Navigation überlappt den Footer",project:"Parkour Baar",projectColor:"#477a63",status:"Resolved",priority:"Low",reporter:"Jamie P.",date:"Gestern",category:"UI / UX"},
 {id:"BUG-020",title:"E-Mail-Benachrichtigung kommt doppelt",project:"Circle",projectColor:"#8b78b8",status:"Open",priority:"Medium",reporter:"Nina S.",date:"Gestern",category:"Benachrichtigungen"},
];
