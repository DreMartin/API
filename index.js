$(() => {

  $('#tableBody').empty()
  $('#dataOne').text('Pick')
  $('#dataTwo').text('From')
  $('#dataThree').text('Above')

  localStorage.clear()
  let storedLaunch = []

  $('#clearButton').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Pick')
    $('#dataTwo').text('From')
    $('#dataThree').text('Above')
  })

  $('#pastLaunch').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Flight#')
    $('#dataTwo').text('Launch Year')
    $('#dataThree').text('Date')

    $.ajax({
      type: 'GET',
      url: 'https://api.spacexdata.com/v2/launches'
    }).done((launchResults) => {
      // console.log(res)
      console.log(launchResults)
      for (p of launchResults) {
        storedLaunch.push({
          flight: p.flight_number,
          year: p.launch_year,
          launch_date: p.launch_date_local
        })
        $('#tableBody').append(createLaunchRow(p))
        // console.log(storedLaunch)
      }
    })
  })

  $('#lastLaunch').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Flight#')
    $('#dataTwo').text('Launch Year')
    $('#dataThree').text('Date')
    $.ajax({
      type: 'GET',
      url: 'https://api.spacexdata.com/v2/launches/latest'
    }).done((latestLaunchResults) => {
      console.log(latestLaunchResults)

      let latestFlightNumber = latestLaunchResults.flight_number;
      let latestFlightYear = latestLaunchResults.launch_year;
      let latestFlightDate = latestLaunchResults.launch_date_utc;
      let row = $(`<tr></tr>`)
      let flight = $(`<td>${latestFlightNumber}</td>`)
      let year = $(`<td>${latestFlightYear}</td>`)
      let date = $(`<td>${latestFlightDate}</td>`)
      row.append(flight)
      row.append(year)
      row.append(date)
      $('#tableBody').append(row)




    console.log(latestFlightNumber);
    console.log(latestFlightYear);
      // // console.log(latestLaunchResults)
      // for (p of latestLaunchResults) {
      //   storedLaunch.push({
      //     flight: p.flight_number,
      //     year: p.launch_year,
      //     launch_date: p.launch_date_local
        // })
        
        // console.log(storedLaunch)
      }
    // })
    )
  })

  $('#nextLaunch').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Flight#')
    $('#dataTwo').text('Launch Year')
    $('#dataThree').text('Date')
    $.ajax({
      type: 'GET',
      url: 'https://api.spacexdata.com/v2/launches/upcoming'
    }).done((upcommingLaunchResults) => {
      // console.log(res)
      console.log(upcommingLaunchResults)
      for (p of upcommingLaunchResults) {
        storedLaunch.push({
          flight: p.flight_number,
          year: p.launch_year,
          launch_date: p.launch_date_local
        })
        $('#tableBody').append(createUpcommingLaunchRow(p))
        // console.log(storedLaunch)
      }
    })
  })



  function createLaunchRow(launch) {
    let row = $(`<tr></tr>`)
    let flight = $(`<td>${launch.flight_number}</td>`)
    let year = $(`<td>${launch.launch_year}</td>`)
    let date = $(`<td>${launch.launch_date_local}</td>`)

    row.append(flight, year, date)

    return row
  }

  // function createLatestLaunchRow() {
  //   let latestFlightNumber = latestLaunchResults.flight_number;
  //   let latestFlightYear = latestLaunchResults.launch_year;
  //   let latestFlightDate = latestLaunchResults.launch_date_utc;
    // let row = $(`<tr></tr>`)
    // let flight = $(`<td>${latestFlightNumber}</td>`)
    // let year = $(`<td>${latestLaunchResults.launch_year}</td>`)
    // let date = $(`<td>${latestLaunchResults.launch_date_local}</td>`)

    // row.append(flight, year, date)

  //   return row
  // }

  function createUpcommingLaunchRow(upcommingLaunch) {
    let row = $(`<tr></tr>`)
    let flight = $(`<td>${upcommingLaunch.flight_number}</td>`)
    let year = $(`<td>${upcommingLaunch.launch_year}</td>`)
    let date = $(`<td>${upcommingLaunch.launch_date_local}</td>`)

    row.append(flight, year, date)

    return row
  }
})