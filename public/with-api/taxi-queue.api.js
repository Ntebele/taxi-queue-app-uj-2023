
document.addEventListener('alpine:init', () => {

    Alpine.data('TaxiQueue', () => {

        return {
            version: 'api-1.0',
            taxiLength: 0,
            passengerCount: 0,
			taxiCount: 0,

            init() {
                this.queueLength(),
                this.taxiQueueLength()
            },
            joinQueue() {
                axios
                    .post('/api/passenger/join')
                    .then(result => {
                        //console.log(result.data)
                        this.message=result.data.message
                    });
                    this.queueLength();
                    this.taxiQueueLength();
            },
            
            leaveQueue() {
                axios.post('/api/passenger/leave')
                    .then(result => {
                        //console.log(result.data);
                        this.message=result.data.message 
                    });
                    this.queueLength();
                    this.taxiQueueLength();

            },

            joinTaxiQueue() {
                axios.post('/api/taxi/join')
                    .then(result => {
                        //console.log(result.data)
                        this.message=result.data.message
                        //this.taxiQueueLength();

                    });
                    this.queueLength();
                    this.taxiQueueLength();

            },

            queueLength() {
                axios
                    .get('/api/passenger/queue')
                    .then(result => {
                        // an example API call
                        this.passengerCount = result.data.queueCount
                        //console.log(this.passengerCount)
                    });

            },

            taxiQueueLength() {
                axios
                    .get('/api/taxi/queue')
                    .then(result => {
                        // an example API call
                        this.taxiLength = result.data.queueCount;
                        console.log(result.data)
                    });
            },

            taxiDepart() {
                if (this.passengerCount >= 12 && this.taxiLength > 0) {
                    axios
                    .post('/api/taxi/depart')
                    .then((result) => {
                        this.message=result.data.message
                        });
                        this.queueLength();
                        this.taxiQueueLength();
                }

            }
        }
    });

});