# SUCCEED Digital · Phase 1

1. Extract the entire ZIP to a folder.
2. Open `index.html` in a current version of Edge, Chrome, Firefox, or Safari. JavaScript must be enabled. No installation, account, or internet connection is needed for checklist work.
3. Select a status for each item you review. Record manuscript locations and notes as needed. A whole-item “Not applicable” selection needs a justification before it counts as a recorded response and before document export. Use Notes for exceptions affecting only part of an item.
4. Changes are autosaved in the same browser profile and location. For offline file URLs, storage behavior varies by browser. The toolbar shows when autosave is unavailable.
5. Both download buttons become available when all 33 responses are recorded. Reported, Partial and Not reported each count as recorded. Not applicable requires a nonblank justification. The message below the buttons shows how many responses remain.
6. Use **Download Word** for an editable DOCX or **Download PDF** for a PDF. Both include page numbers, all six sections, all 33 items, your responses, and the citation, regardless of the active filter.
7. Select **Explanation** beside an item to expand its explanation from the supplied document. Select **Hide explanation** to close it. Each panel cites the source page and links to the bundled PDF, including its examples and bibliography.

## Download layout

Word and PDF downloads adapt the official fillable SUCCEED checklist with a Notes column immediately after Page number. Recommendations remain the widest column. The landscape layout, blue section headings, logo and source recommendation text are retained. The manuscript title is bold and pages are numbered.

The Page number column contains the full manuscript page/section entry. The Notes column contains reporting status, notes and any required justification. Long responses wrap and may continue onto another page. Column headings repeat on subsequent table pages. There is no appendix.

The reference remains the BMJ article. The template's volume number has been corrected from 393 to the article's published volume, 394.

PDF layout and long-response pagination were checked. Word uses editable tables with flexible row heights, so pagination may depend on the Word version and available fonts. Visual Word rendering could not be verified in this environment because LibreOffice is unavailable.

## Source and reuse

Gogovor A, Légaré F, Moher D, Zomahoun HTV, Ben Charif A, Ekanmian G, McLean RKD, Milat A, Wolfenden L, Prévost K, Aubin E, Rochon P. SUCCEED guideline for reporting studies of scaling evidence-informed interventions, with explanations and examples. BMJ. 2026 Jul 17;394:e069389. doi:10.1136/bmj-2026-069389. Table 1, pp. 3–4.

- [Publisher’s Table 1](https://www.bmj.com/content/394/bmj-2026-069389.full.pdf#page=3)
- [EQUATOR guideline entry and official fillable checklist](https://equator-network.org/reporting-guidelines/succeed/index.html)
- [OSF supporting resources cited in the article](https://osf.io/azm8u)

Table 1 © 2026 the authors, reused for noncommercial use under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Recommendation text is unchanged, with PDF line breaks normalized. The digital layout, conditional indicators, and response fields are additions. This independent, unofficial reporting aid does not imply endorsement by the guideline authors, BMJ, or EQUATOR Network. Progress measures responses recorded. Study and reporting quality require separate assessment.

## Source files

- `index.html` defines the page.
- `styles.css` defines the sky-blue theme, responsive layout, and print styling.
- `guideline.js` contains the cited Table 1 transcription.
- `explanations.js` contains the 33 explanation passages from the supplied Gogovor et al. document, with PDF spacing normalized and source page references.
- `resources/SUCCEED-explanations-and-examples.pdf` is the supplied explanation and examples document.
- `app.js` handles input, progress, local storage and report generation.
- `word.js` builds the Word file locally.
- `s4-template.js` bundles the source Word formatting, checklist rows, logo and adjusted column widths.
- `s4.js` maps responses into the Page number and Notes columns.
- `pdf.js` builds the PDF locally using the bundled `vendor/pdf-lib.min.js`. Its MIT license is included in `vendor/pdf-lib-LICENSE.md`.

The folder can also be served as static files. For example, from this folder with Python 3 installed, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/`. Keep the same browser, address and port when resuming an autosaved draft.
