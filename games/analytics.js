(function () {
  "use strict";

  // FIVE by Droxion: optional analytics, never loaded before visitor opt-in.
  // This ID identifies the public FIVE by Droxion GA4 web stream, not a credential.
  const MEASUREMENT_ID = "G-J5WYY9ZFFV";
  const STORAGE_KEY = "five-analytics-choice-v1";
  const allowedEvents = new Set(["game_start", "game_complete", "practice_selected", "hint_used", "result_shared"]);
  let enabled = false;
  let initialized = false;

  function savedChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (error) { return null; }
  }
  function remember(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (error) { /* private mode */ }
  }

  function beginAnalytics() {
    if (initialized) return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    // Consent defaults precede any tag configuration or measurement command.
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("config", MEASUREMENT_ID, { send_page_view: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
    enabled = true;
  }

  function track(name, details) {
    if (!enabled || !allowedEvents.has(name) || typeof window.gtag !== "function") return;
    const properties = {
      game_name: "five",
      game_mode: details && details.mode === "practice" ? "practice" : "daily"
    };
    if (name === "game_complete") {
      properties.outcome = details && details.won ? "win" : "loss";
      properties.attempts = Math.max(1, Math.min(6, Number(details && details.attempts) || 6));
      properties.hint_used = !!(details && details.hintUsed);
    }
    // Never attach the word, guessed letters, player identity or local stats.
    window.gtag("event", name, properties);
  }

  function init() {
    const banner = document.getElementById("analyticsConsent");
    const manage = document.getElementById("analyticsManage");
    const accept = document.getElementById("analyticsAccept");
    const decline = document.getElementById("analyticsDecline");
    if (!banner || !manage || !accept || !decline) return;

    function hide() { banner.hidden = true; }
    function show() { banner.hidden = false; }
    manage.addEventListener("click", show);
    accept.addEventListener("click", function () {
      remember("yes");
      beginAnalytics();
      hide();
    });
    decline.addEventListener("click", function () {
      remember("no");
      hide();
      if (enabled) {
        // Revoke consent and unload the tag by reloading with tracking disabled.
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied"
        });
        enabled = false;
        window.location.reload();
      }
    });
    const choice = savedChoice();
    if (choice === "yes") beginAnalytics();
    else if (choice !== "no") show();
  }

  window.fiveAnalytics = { track: track };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();