import Alpine from 'alpinejs'
import Config from './config'
import Templates from './templates'
import hljs from 'highlight.js'

export default new class Main {
	constructor() {
		this.handler();
	}

	Builder = () => ({
		input: '',
		tab: 'form',
		showCode: false,
		formCode: ' ',
		htmlCode: ' ',
		tailwindcssCode: ' ',
		jsCode: ' ',
		async submit() {
			this.buttonLabel = 'Отправка'
			this.sending = true

			try {
				const context = await (
					await fetch(`${Config.serverAddress}/formdress?url=${this.input}`)
				).json()
				this.formCode = this.setCodeAsInnerText(Templates.form(context))
				this.htmlCode = hljs.highlightAuto(this.setCodeAsInnerText(Templates.form(context))).value
				this.jsCode = hljs.highlightAuto(this.setCodeAsInnerText(Templates.js(context))).value
				this.tailwindcssCode = hljs.highlightAuto(`
	.button {
		@apply flex items-center justify-center px-4 py-2 font-semibold text-white transition bg-purple-500 rounded focus:outline-none focus-visible:ring-purple-500 focus-visible:bg-white focus-visible:text-black ring-2 ring-transparent hover:opacity-75;
	}

	.input {
		@apply rounded ring-2 p-2 ring-purple-500 m-0.5 focus:ring-black hover:ring-purple-300 transition focus:outline-none;
	}`).value
				this.showCode = true
			} catch (e) {

			} finally {
				console.log('test');
			}
		},
		setCodeAsInnerText(text) {
			return text
				.split('\n')
				.filter(l => !!l.trim())	// Remove whitelines
				.map(l => l.trim() === '<!-- emptyline -->' ? '' : l)	// Transform comment to emptyline
				.join('\n')
		}
	})

	handler() {
		const form = () => ({
			message: '',
			async submit() {
				const form = {
					method: this.$refs.form.method,
					mode: 'no-cors',
					body: new FormData(this.$refs.form)
				}
				try {
					await fetch(this.$refs.form.action)
				} catch (e) {

				} finally {

				}
			}
		})
		Alpine.data('Builder', this.Builder)
		Alpine.data('form', form)
		Alpine.start()
	}
}
