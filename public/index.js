async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // fetched stock info from TwelveData using our API key
    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=86a25fec29dd4e78a512e7fe44f4a551`)
    const result = await response.json()
        console.log(result)
    
    


}

main()