document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
			passengerCount: 0,
			taxiCount: 0,


			joinQueue() {

				this.passengerCount++;

			},
			leaveQueue() {

				if (this.passengerCount > 0) {
                    this.passengerCount--;
                }

			},

			joinTaxiQueue() {

				this.taxiCount++;

			},

			queueLength() {

				return this.queueLength;

			},

			taxiQueueLength() {

				return this.taxiCount;

			},

			taxiDepart() {

				if (this.taxiCount > 0 && this.passengerCount >= 12) {
                    this.taxiCount--;
                    this.passengerCount -= 12;
                }
				

			}
		}
	});

});