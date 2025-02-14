async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // fetched stock info from TwelveData using our API key
    // const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=86a25fec29dd4e78a512e7fe44f4a551`)
    // const result = await response.json()
    //     console.log(result)
    
        // let GME = result.GME
        // let MSFT = result.MSFT
        // let DIS = result.DIS
        // let BNTX = result.BNTX

        // You can Refractor putting all the variables into {} before the = and setting it to result? Nice.
        // const {GME, MSFT, DIS, BNTX} = result 
        const {GME, MSFT, DIS, BNTX} = mockData //using mockData for practice to not burn out the API requests.

        // Bonus Note: 
        // Another way to write the above lines would to refactor it as:
           // const {GME, MSFT, DIS, BTNX} = result 
        // This is an example of "destructuring" an object
        // "Destructuring" creates new variables from an object or an array

        const stocks = [GME, MSFT, DIS, BNTX];
        // console.log(stocks)

        //Code to reverse the dates from oldest to newest.
        stocks.forEach(stock => stock.values.reverse())

        // Chart from twelveData
        new Chart(timeChartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: stocks[0].values.map(value => value.datetime),
                datasets: stocks.map (stock => ({
                    label: stock.meta.symbol,
                    data: stock.values.map(value => parseFloat(value.high)),
                    backgroundColor: getColor(stock.meta.symbol),
                    borderColor: getColor(stock.meta.symbol)           
                }))
            }
        });
        // console.log(stocks[0].values)

        // Chart for highestPrice
        // Unlike the line chart, the labels will be stock symbols, not dates.
        // Unlike the line chart, you will only need one dataset; 
        // the data in that dataset will be an array of numbers representing the highest price for each stock.
        new Chart(highestPriceChartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: stocks.map(stock => stock.meta.symbol),  // Had to look up the mockData.js to see where this was coming from.
                datasets: [{
                    label: 'Highest',                    
                    // Was not aware you had to wrap getColor with parenthesis after the arrow => function.
                    // Now aware that it means implicit return and does not need curly brackets {}.
                    data: stocks.map(stock => (
                        getHighest(stock.values)
                    )),
                    backgroundColor: stocks.map(stock => (
                        getColor(stock.meta.symbol)
                    )),
                    borderColor: stocks.map(stock => (
                        getColor(stock.meta.symbol)
                    )),
                }]
            }
        })

}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


// I needed some help figuring this out.  
// I wasn't sure if I needed an else statement for when iterating and setting the result to become the new defined variable.
function getHighest(stock) {
    let highest = 0;
    stock.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}

main()