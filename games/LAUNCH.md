# FIVE by Droxion — launch checklist

## Status
The static site preview is hosted on Render at https://droxion-play-preview.onrender.com.
The temporary preview has a page-level `noindex,nofollow` tag.
Do **not** claim Google indexing, analytics, or custom DNS is live until the steps below are verified.

## QA
- Test on Chrome, Safari on iPhone, and Chrome on Android; include small screens.
- Verify on-screen keyboard, physical keyboard, Enter/Backspace.
- Try valid five-letter words: ADIEU, CRANE, STARE, SNAIL, RAISE.
- Reject fake words; accept a legitimate five-letter guess and reveal correct tiles.
- Confirm repeated-letter scoring (e.g. ALLEY vs APPLE -> exact,present,miss,present,miss).
- Finish a daily puzzle, refresh and verify saved win/streak; practice must not count toward daily wins.
- Try sharing, switching light/dark modes, hints and stats.
- Verify midnight UTC daily rollover and localStorage behavior.

## DNS connection
1. On the Render static site `droxion-play-preview`, open **Settings → Custom Domains**.
2. Add `games.droxion.com`. Record any Render instructions given there.
3. In the authoritative DNS zone for `droxion.com` (GoDaddy if it hosts DNS), add:
   - Type: CNAME
   - Host: games
   - Value: droxion-play-preview.onrender.com
   - TTL: default
   Only change conflicting existing `games` records after verifying they are not in use.
4. Return to Render, click **Verify**, wait for HTTPS certificate provisioning.
5. Confirm that https://games.droxion.com loads the game and its /words.txt asset.

## Indexing and measurement
1. Only AFTER custom domain HTTPS is verified, update games/index.html to replace the `noindex,nofollow` tag with `index,follow`. This will require deploying again.
2. Keep the canonical URL set to https://games.droxion.com/.
3. Verify domain ownership in Google Search Console using its exact instructions.
4. Submit https://games.droxion.com/sitemap.xml.
5. Choose/configure an analytics platform with privacy disclosures before claiming visitor or retention measurements.
6. Track Search Console impressions/clicks plus returning-player metrics; do not equate search volume to visitors.

## Business / compliance
The preview is free, with no ads, subscriptions or checkout. Do not imply revenue is live. Review advertising requirements before integration.
Existing domains and production services remain unchanged.
Word dictionary in words.txt is sourced from the MIT-licensed tabatkins/wordle-list; see WORDLIST-LICENSE.txt.
