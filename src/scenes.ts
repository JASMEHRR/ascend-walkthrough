// One entry per screen. focus = [x%, y%] the slow zoom drifts toward.
export type Scene = {file: string; title: string; caption: string; seconds: number; focus?: [number, number]; zoom?: number};

export const scenes: Scene[] = [
  {file: '01-dashboard.jpg', title: 'Dashboard', caption: 'JARVIS greets you with discipline, streak, open tasks, habits and your next class at a glance.', seconds: 12, focus: [55, 45]},
  {file: '11-panels.jpg', title: 'Side Panels', caption: 'Vitals, focus, habits, reminders, shortcuts and chats, one click away on the right.', seconds: 9, focus: [88, 40]},
  {file: '12-reminders.jpg', title: 'Reminders', caption: 'Scheduled nudges and alerts, also delivered to Telegram.', seconds: 9, focus: [50, 80]},
  {file: '13-deck.jpg', title: 'Command Deck', caption: 'One-tap shortcuts into any module, right under the JARVIS chat.', seconds: 8, focus: [50, 85]},
  {file: '02-arena.jpg', title: 'Arena', caption: 'A shared habit board with rooms, puzzles, streaks and a live leaderboard.', seconds: 12, focus: [65, 40]},
  {file: '08-timetable.jpg', title: 'Timetable', caption: 'Upload a photo of your schedule once. JARVIS reads it and texts you before every lesson.', seconds: 12, focus: [58, 65]},
  {file: '09-attendance.jpg', title: 'Attendance', caption: "Mark each class as it happens and track every subject's attendance over 90 days.", seconds: 10, focus: [58, 55]},
  {file: '04-strategic.jpg', title: 'Strategic Command', caption: 'Offer, pipeline and outreach workspace: validate, find prospects, track the funnel.', seconds: 11, focus: [50, 55]},
  {file: '07-journal.jpg', title: 'Journal', caption: 'Type or dictate an entry, or just tell JARVIS "journal: ...".', seconds: 9, focus: [58, 40]},
  {file: '05-vision.jpg', title: 'Vision Board', caption: 'Pin the goals and aspirations you are working toward.', seconds: 7, focus: [55, 35]},
  {file: '06-purchases.jpg', title: 'Purchases', caption: 'A passcode-locked list of things to buy.', seconds: 7, focus: [58, 45]},
  {file: '10-modules.jpg', title: 'My Modules', caption: 'Ask JARVIS to build a new module, or add one yourself. No coding needed.', seconds: 8, focus: [60, 30]},
  {file: '14-settings.jpg', title: 'Settings', caption: 'Turn modules on or off, tune JARVIS, the theme and your connections.', seconds: 10, focus: [55, 45]},
];
