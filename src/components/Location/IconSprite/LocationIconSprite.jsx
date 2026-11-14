/* ==========================================================================
   COMPONENTE: IconSprite
   Sprites SVG com os ícones e símbolos usados na página Local.
========================================================================== */

export default function IconSprite() {
  return (
    <>
      <svg className="location-icon-sprite" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <symbol id="i-compass" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </symbol>
          <symbol id="i-pin" viewBox="0 0 24 24">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </symbol>
          <symbol id="i-landmark" viewBox="0 0 24 24">
            <line x1="3" x2="21" y1="22" y2="22"></line>
            <line x1="6" x2="6" y1="18" y2="11"></line>
            <line x1="10" x2="10" y1="18" y2="11"></line>
            <line x1="14" x2="14" y1="18" y2="11"></line>
            <line x1="18" x2="18" y1="18" y2="11"></line>
            <polygon points="12 2 20 7 4 7"></polygon>
            <line x1="2" x2="22" y1="18" y2="18"></line>
          </symbol>
          <symbol id="i-building" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4M10 10h4M10 14h4M10 18h4"></path></symbol>
          <symbol id="i-mountain" viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></symbol>
          <symbol id="i-waves" viewBox="0 0 24 24"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path></symbol>
          <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"></path><path d="M19 17v4M17 19h4"></path></symbol>
          <symbol id="i-search" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </symbol>
          <symbol id="i-map" viewBox="0 0 24 24">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"></polygon>
            <line x1="9" x2="9" y1="3" y2="18"></line>
            <line x1="15" x2="15" y1="6" y2="21"></line>
          </symbol>
          <symbol id="i-grid" viewBox="0 0 24 24">
            <rect width="7" height="7" x="3" y="3" rx="1"></rect>
            <rect width="7" height="7" x="14" y="3" rx="1"></rect>
            <rect width="7" height="7" x="14" y="14" rx="1"></rect>
            <rect width="7" height="7" x="3" y="14" rx="1"></rect>
          </symbol>
          <symbol id="i-dollar" viewBox="0 0 24 24"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></symbol>
          <symbol id="i-eye" viewBox="0 0 24 24">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </symbol>
          <symbol id="i-chat" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></symbol>
          <symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></symbol>
          <symbol id="i-share" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
          </symbol>
          <symbol id="i-user" viewBox="0 0 24 24">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </symbol>
          <symbol id="i-users" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </symbol>
          <symbol id="i-pen" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path></symbol>
          <symbol id="i-layers" viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </symbol>
          <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></symbol>
          <symbol id="i-check" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </symbol>
          <symbol id="i-circle" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"></circle>
          </symbol>
          <symbol id="i-play" viewBox="0 0 24 24">
            <polygon points="7 4 20 12 7 20 7 4" fill="currentColor"></polygon>
          </symbol>
          <symbol id="i-video" viewBox="0 0 24 24">
            <path d="m22 8-6 4 6 4V8Z"></path>
            <rect width="14" height="12" x="2" y="6" rx="2"></rect>
          </symbol>
          <symbol id="i-mail" viewBox="0 0 24 24">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </symbol>
          <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></symbol>
          <symbol id="i-chev-r" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></symbol>
          <symbol id="i-chev-l" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></symbol>
          <symbol id="i-plane" viewBox="0 0 24 24"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></symbol>
          <symbol id="i-home" viewBox="0 0 24 24">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </symbol>
          <symbol id="i-info" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4M12 8h.01"></path>
          </symbol>
          <symbol id="i-chev-d" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></symbol>
          <symbol id="i-logout" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" x2="9" y1="12" y2="12"></line>
          </symbol>
          <symbol id="i-trash" viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></symbol>
          <symbol id="i-upload" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </symbol>
          <symbol id="i-download" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </symbol>
          <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></symbol>
          <symbol id="i-globe" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </symbol>
          <symbol id="i-chart" viewBox="0 0 24 24"><path d="M3 3v18h18"></path><path d="M18 17V9M13 17V5M8 17v-3"></path></symbol>
          <symbol id="i-key" viewBox="0 0 24 24">
            <circle cx="7.5" cy="15.5" r="5.5"></circle>
            <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"></path>
          </symbol>
          <symbol id="i-file" viewBox="0 0 24 24">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </symbol>
          <symbol id="i-help" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
          </symbol>
          <symbol id="i-eye-off" viewBox="0 0 24 24">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            <line x1="2" x2="22" y1="2" y2="22"></line>
          </symbol>
          <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path><path d="M3 21v-5h5"></path></symbol>
          <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></symbol>
          <symbol id="i-ig" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </symbol>
          <symbol id="i-fb" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></symbol>
          <symbol id="i-wa" viewBox="0 0 24 24"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></symbol>
        </defs>
      </svg>
      <svg className="location-icon-sprite" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <symbol id="i-star" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </symbol>
          <symbol id="i-clock" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </symbol>
          <symbol id="i-calendar" viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M16 2v4M8 2v4M3 10h18"></path>
          </symbol>
          <symbol id="i-flag" viewBox="0 0 24 24">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" x2="4" y1="22" y2="15"></line>
          </symbol>
          <symbol id="i-image" viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"></path>
          </symbol>
          <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"></path></symbol>
          <symbol id="i-lock" viewBox="0 0 24 24">
            <rect width="18" height="11" x="3" y="11" rx="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </symbol>
          <symbol id="i-nav" viewBox="0 0 24 24">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </symbol>
          <symbol id="i-sun" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
          </symbol>
          <symbol id="i-settings" viewBox="0 0 24 24">
            <line x1="4" x2="4" y1="21" y2="14"></line>
            <line x1="4" x2="4" y1="10" y2="3"></line>
            <line x1="12" x2="12" y1="21" y2="12"></line>
            <line x1="12" x2="12" y1="8" y2="3"></line>
            <line x1="20" x2="20" y1="21" y2="16"></line>
            <line x1="20" x2="20" y1="12" y2="3"></line>
            <line x1="2" x2="6" y1="14" y2="14"></line>
            <line x1="10" x2="10.01" y1="8" y2="8"></line>
            <line x1="18" x2="22" y1="16" y2="16"></line>
          </symbol>
          <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></symbol>
          <symbol id="p-leaf" viewBox="0 0 24 24"><path d="M20 3C10 3 4 9 4 17c0 2 1 3 3 3 8 0 13-6 13-17z"></path></symbol>
          <symbol id="p-heart" viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"></path></symbol>
          <symbol id="p-star" viewBox="0 0 24 24"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z"></path></symbol>
          <symbol id="p-dot" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8"></circle>
          </symbol>
          <symbol id="p-bubble" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"></circle>
          </symbol>
        </defs>
      </svg>
    </>
  );
}
