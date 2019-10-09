module.exports = {
	baseUrl: 'http://localhost:3000',
	gridUrl: 'http://localhost:4444/wd/hub',
	sets: {
        desktop: {
            files: 'tests/desktop'
        }
    },
	browsers: {
		chrome: {
			desiredCapabilities: {
				browserName: 'chrome'
			},
			screenshotsDir: 'hermione-html-report/chrome'
		 },
		 firefox: {
			desiredCapabilities: {
				browserName: 'firefox'
			},
			screenshotsDir: 'hermione-html-report/firefox'
 		}
	},
	plugins: {
		'html-reporter/hermione': {
			path: 'hermione-html-report'
		}
	},
	meta: {
		repositoryID: 'arcanum',
		pathToDir: 'src/server',
		pathToFile: 'src/server/index.js'
	}
}