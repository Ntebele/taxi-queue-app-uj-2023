document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {
	  return {
		version: 'api-1.0',
		queueLength: 0,
		taxiQueueLength: 0,
		

		init() {
		  // Initialize queueLength and taxiQueueLength using API calls
		  this.fetchQueueLength();
		  this.fetchTaxiQueueLength();
		},
		async fetchQueueLength() {
		  try {
			const response = await axios.get('/api/passenger/queue');
			this.queueLength = response.data.queueCount;
		  } catch (error) {
			console.error('Error fetching passenger queue length:', error);
		  }
		},
		async fetchTaxiQueueLength() {
		  try {
			const response = await axios.get('/api/taxi/queue');
			this.taxiQueueLength = response.data.queueCount;
		  } catch (error) {
			console.error('Error fetching taxi queue length:', error);
		  }
		},
		async joinQueue() {
		  try {
			await axios.post('/api/passenger/join');
			this.fetchQueueLength();
		  } catch (error) {
			console.error('Error joining passenger queue:', error);
		  }
		},
		async leaveQueue() {
		  try {
			await axios.post('/api/passenger/leave');
			this.fetchQueueLength();
		  } catch (error) {
			console.error('Error leaving passenger queue:', error);
		  }
		},
		async joinTaxiQueue() {
		  try {
			await axios.post('/api/taxi/join');
			this.fetchTaxiQueueLength();
		  } catch (error) {
			console.error('Error joining taxi queue:', error);
		  }
		},
		async taxiDepart() {
		  try {
			await axios.post('/api/taxi/depart');
			this.fetchTaxiQueueLength();
			this.fetchQueueLength();
		  } catch (error) {
			console.error('Error departing taxi:', error);
		  }
		},
	  };
	});
  });
  