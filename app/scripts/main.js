import Alpine from 'alpinejs'
import Config from './config'
import Templates from './templates'

export default new class Main {
	constructor() {
		this.handler();
	}

	Builder = () => ({
		input: '',
		formCode: ' ',
		jsCode: ' ',
		async submit() {
			this.buttonLabel = 'Отправка'
			this.sending = true

			try {
				const context = await (
					await fetch(`${Config.serverAddress}/formdress?url=${this.input}`)
				).json()
				this.formCode = this.setCodeAsInnerText(Templates.form(context))
				this.jsCode = this.setCodeAsInnerText(Templates.js(context))
			} catch (e) {

			} finally {

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
