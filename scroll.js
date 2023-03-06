const MAX_VISIBLE_TEXT_ELEMENTS_COUNT = 6; // 2 elements per 3 lines each
const RICH_CONTENT_TYPE = "richContent";
// HTML DATA ATTRIBUTES:
const ATTRIBUTE_NAME = "data-lp-point";
const ENGAGEMENT_AREA = "engagement_area";
const LINES_AREA = "lines_area";
// HTML IDS:
const LP_LINE_ID = "lp_line_";

const getAttribute = (value, name = ATTRIBUTE_NAME, matchLike = false) => {
  return `${name}${matchLike ? "^" : ""}='${value}`;
};

try {
  const loadListener = () => {
    lpTag.hooks.push({
      name: "AFTER_GET_LINES",
      callback: function ({ data }) {
        if (!data.lines.length) return;

        const lastLineIdx = data.lines.length - 1;
        const lastLine = data.lines[lastLineIdx];
        if (!lastLine || lastLine.type !== RICH_CONTENT_TYPE || lastLine.text.elements.length < MAX_VISIBLE_TEXT_ELEMENTS_COUNT) return;

        const lineElements = document.querySelectorAll(`div[${getAttribute(LINES_AREA)}] > div[${getAttribute(LP_LINE_ID, "id", true)}]`);
        const engagementAreaElement = document.querySelector(`div[${getAttribute(ENGAGEMENT_AREA)}]`);

        // Disabling scroll
        engagementAreaElement.style.overflow = "hidden";

        setTimeout(() => {
          const idx = lastLineIdx || lineElements.length;
          const prevMessageElement = document.querySelector(`div[${getAttribute(`${LP_LINE_ID}${idx - 1}`, "id")}]`);

          engagementAreaElement.style.overflow = "auto";
          engagementAreaElement.scrollTop = prevMessageElement.offsetTop - 100;
        }, 1000);
      },
    });
  };

  document.addEventListener("DOMContentLoaded", loadListener);
} catch (e) {
  console.dir(e.message);
}
