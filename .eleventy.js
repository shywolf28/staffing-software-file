const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("date", (value, format) => {
    const d = new Date(value);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    if (format === "yyyy-MM-dd") return `${yyyy}-${mm}-${dd}`;
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${yyyy}`;
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/posts/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
