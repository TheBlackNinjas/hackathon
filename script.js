// Function to load CSV data
function loadCSV(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let rows = xhr.responseText.split('\n').slice(1); // Skipping header
            callback(rows);
        }
    };
    xhr.send();
}

// Load métiers and populate the dropdown
loadCSV('data/metiers.csv', function(rows) {
    let select = document.getElementById('metier');
    rows.forEach(row => {
        let data = row.split(',');
        let option = document.createElement('option');
        option.value = data[0];
        option.textContent = data[0];
        select.appendChild(option);
    });
    select.onchange = function() {
        loadEvents(this.value);
    }
});

// Load events based on selected métier
function loadEvents(metier) {
    loadCSV('data/events.csv', function(rows) {
        let results = document.getElementById('results');
        results.innerHTML = ''; // Clear previous results
        rows.forEach(row => {
            let data = row.split(',');
            if (data[0] === metier) {
                let eventDiv = document.createElement('div');

                let title = document.createElement('div');
                title.className = 'event-title';
                title.textContent = `${data[0]}: ${data[1]}`;

                let details = document.createElement('div');
                details.className = 'event-details';
                details.innerHTML = `
                    Date: <span class="event-date">${data[2]}</span> à ${data[3]}<br>
                    Description: <span class="event-description">${data[4]}</span><br>
                    Participants: ${data[5]}
                `;

                eventDiv.appendChild(title);
                eventDiv.appendChild(details);

                results.appendChild(eventDiv);
            }
        });
    });
}
