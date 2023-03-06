lpTag.external = lpTag.external || {};
const LP_LINE_ID = "lp_line_";
const getAttribute = (value, name = "data-lp-point", matchLike = false) => {
  return `${name}${matchLike ? "^" : ""}='${value}'`;
};
lpTag.external.hook = {
  // handle incoming messages
  afterGetLines: function ({data}) {
    try {
      if (data.lines.length > 0) {
        const lastLineIdx = data.lines.length - 1;
        const lastLine = data.lines[lastLineIdx];
        if (!lastLine || lastLine.type !== "richContent" || lastLine.text.elements.length < 6) return;

        const lineElements = document.querySelectorAll(`div[${getAttribute("lines_area")}] > div[${getAttribute("lp_line_", "id", true)}]`);
        const engagementAreaElement = document.querySelector(`div[${getAttribute("engagement_area")}]`);

        // Disabling scroll
        engagementAreaElement.style.overflow = "hidden";

        setTimeout(() => {
          const idx = lastLineIdx || lineElements.length;
          const prevMessageElement = document.querySelector(`div[${getAttribute(`${LP_LINE_ID}${idx - 1}`, "id")}]`);
          console.log("prevMessageElement", prevMessageElement);
          engagementAreaElement.style.overflow = "auto";
          engagementAreaElement.scrollTop = prevMessageElement.offsetTop - 100;
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

lpTag.hooks.push({
  name: "AFTER_GET_LINES",
  callback: lpTag.external.hook.afterGetLines,
});
