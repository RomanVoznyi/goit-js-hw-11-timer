import timerTemplate from '../templates/timer.hbs';

class CountdownTimer {
	constructor({ selector, targetDate }) {
		this.id = selector;
		this.target = targetDate;
		this.createMarkup();
		this.refs = {
			daysField: document.querySelector(`#${this.id} .value[data-value='days']`),
			hoursField: document.querySelector(`#${this.id} .value[data-value='hours']`),
			minsField: document.querySelector(`#${this.id} .value[data-value='mins']`),
			secsField: document.querySelector(`#${this.id} .value[data-value='secs']`),
		};
		this.startTimer();
	}

	createMarkup() {
		const body = document.querySelector("body");
		body.insertAdjacentHTML("afterbegin", timerTemplate({ id: this.id }));
		body.insertAdjacentHTML("afterbegin", `<h1>До Нового ${this.target.getFullYear() + 1} року залишилось:</h1>`);
	}

	startTimer() {
		this.countNumbers();

		setInterval(() => {
			this.countNumbers();
		}, 1000);
	}

	countNumbers() {
		const currentDate = new Date();
		const time = this.target - currentDate;

		const days = Math.floor(time / (1000 * 60 * 60 * 24));
		const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		const secs = Math.floor((time % (1000 * 60)) / 1000);

		this.refs.daysField.textContent = this.formatDate(days);
		this.refs.hoursField.textContent = this.formatDate(hours);
		this.refs.minsField.textContent = this.formatDate(mins);
		this.refs.secsField.textContent = this.formatDate(secs);
	}

	formatDate(value) {
		return value < 10 ? `0${value}` : value;
	}
}

const currentDate = new Date();

const timerOne = new CountdownTimer({
	selector: 'timer-1',
	targetDate: new Date(currentDate.getFullYear(), 11, 31),
});