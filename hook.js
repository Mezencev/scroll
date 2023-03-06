lpTag.external = lpTag.external || {};
const getAttribute = (value, name = "data-lp-point", matchLike = false) => {
  return `${name}${matchLike ? "^" : ""}='${value}'`;
};
lpTag.external.hook = {
  // handle incoming messages
  afterGetLines: function (data) {
    try {
      if (data.data.lines.length > 0) {
        const lastLineIdx = data.lines.length - 1;
        const lastLine = data.lines[lastLineIdx];
        if (!lastLine || lastLine.type !== "richContent" || lastLine.text.elements.length < 6) return;

        const lineElements = document.querySelectorAll(`div[${getAttribute("lines_area")}] > div[${getAttribute("lp_line_", "id", true)}]`);
        const engagementAreaElement = document.querySelector(`div[${getAttribute("engagement_area")}]`);

        // Disabling scroll
        engagementAreaElement.style.overflow = "hidden";

        setTimeout(() => {
          const idx = lastLineIdx || lineElements.length;
          const prevMessageElement = document.querySelector(`div[${getAttribute(`${"lp_line_"}${idx - 1}`, "id")}]`);

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
