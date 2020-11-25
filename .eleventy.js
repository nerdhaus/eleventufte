const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const tufteWrapper = require('./util/tufteWrapper')

module.exports = function (eleventyConfig) {
		// Plugins
		eleventyConfig.addPlugin(pluginRss)
		eleventyConfig.addPlugin(pluginNavigation)
			
		// Asset Watch Targets
		eleventyConfig.addWatchTarget('./src/assets')

		/* Markdown Configuration */
		let options = {
		    react: false,
    };

		// Markdown
		eleventyConfig.setLibrary("md", tufteWrapper)
    eleventyConfig.addFilter("markdown", tufteWrapper.render)
    eleventyConfig.addFilter("markdownInline", tufteWrapper.renderInline)
    
		// Layouts
		eleventyConfig.addLayoutAlias('base',			'base.njk')
		eleventyConfig.addLayoutAlias('simple',		'base.njk')
		eleventyConfig.addLayoutAlias('post',		  'base.njk')

		// Pass-through files
		eleventyConfig.addPassthroughCopy('src/admin')
		eleventyConfig.addPassthroughCopy('src/assets')
		eleventyConfig.addPassthroughCopy('src/uploads')

		// Deep-Merge
		eleventyConfig.setDataDeepMerge(true)

		// Base Config
		return {
				dir: {
						input: 'src',
						output: 'dist',
						includes: '_includes',
						layouts: '_layouts',
						data: '_data'
				},
				templateFormats: ['njk', 'md', '11ty.js'],
				htmlTemplateEngine: 'njk',
				markdownTemplateEngine: 'njk'
		}
}
