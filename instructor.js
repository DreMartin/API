$(() => {
  
    localStorage.clear()
    let storedLaunch = []
    let storedPlanets = []
  
    $('#clearButton').click(() => {
      $('#tableBody').empty()
      $('#dataOne').text('Pick')
      $('#dataTwo').text('From')
      $('#dataThree').text('Above')
    })
  
    $('#peopleButton').click(() => {
      $('#tableBody').empty()
      $('#dataOne').text('Flight#')
      $('#dataTwo').text('Launch Year')
      $('#dataThree').text('Date')
  
      if(!localStorage.getItem('storedLaunch')){
        $.ajax({
          type: 'GET',
          url: 'https://api.spacexdata.com/v2/launches'
        }).done((launchResults) => {
          // console.log(res)
          // console.log(launchResults)
          for(p of launchResults) {
            storedLaunch.push({flight: p.flight_number, year: p.launch_year, launch_date: p.launch_date_local})
            $('#tableBody').append(createLaunchRow(p))
            // console.log(storedLaunch)
          }
          localStorage.setItem('storedLaunch', JSON.stringify(storedLaunch))
        })
      } else {
        // Get info from local storage, assign it to a variable so we can play with it
        let launchStoredInfo = localStorage.getItem('storedLaunch');
        // console.log(launchStoredInfo)
        let myLaunchObject = eval('(' + launchStoredInfo + ')')
        for (i in myLaunchObject){
        //   console.log(myLaunchObject[i]);
        }
        for(p of myLaunchObject) {
          $('#tableBody').append(createLaunchRow(p))
          console.log(p)
        }
      })
    })
  
    $('#planetButton').click(() => {
      $('#tableBody').empty()
      $('#dataOne').text('Name')
      $('#dataTwo').text('Diameter')
      $('#dataThree').text('Climate')
      
      if(!localStorage.getItem('storedPlanets')) {
        $.get('https://swapi.co/api/planets/')
        .done((res) => {
          console.log(res)
          let planets = res.results
          for(p of planets) {
            storedPlanets.push({name: p.name, diameter: p.diameter, climate: p.climate})
            $('#tableBody').append(createPlanetRow(p))
          }
          localStorage.setItem('storedPlanets', JSON.stringify(storedPlanets))
        })
      } else {
        for(p of storedPlanets) {
          $('#tableBody').append(createPlanetRow(p))
        }
      }
    })
  
    function createLaunchRow(launch) {
      let row = $(`<tr></tr>`)
      let flight = $(`<td>${launch.flight_number}</td>`)
      let year = $(`<td>${launch.launch_year}</td>`)
      let date = $(`<td>${launch.launch_date_local}</td>`)
  
      row.append(flight, year, date)
  
      return row
    }
  
    function createPlanetRow(planet) {
      let row = $(`<tr></tr>`)
      let name = $(`<td>${planet.name}</td>`)
      let diameter = $(`<td>${planet.diameter}</td>`)
      let climate = $(`<td>${planet.climate}</td>`)
  
      row.append(name, diameter, climate)
  
      return row
    }
  
    $('#searchPersonForm').submit((e) => {
      e.preventDefault()
      
      let input = $('#inputName').val()
      $('#inputName').val('')
  
      $.get(`https://swapi.co/api/people/?search=${input}`)
        .done((res) => {
          let person = res.results[0]
          $('#personInfoPanel').text(`${person.name}'s hair is: ${person.hair_color}`)
        })
    })
  