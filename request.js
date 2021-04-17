var request = require('request')

request('https://api.hbdm.com/linear-swap-api/v1/swap_contract_info?AccessKeyId=1627058f-ht4tgq1e4t-0f100b56-383d4&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2021-04-17T12%253A34%253A12&Signature=49f15f74c19b10be4a278f85ff1051eb5280809905b6a4bb5b361111e947564a', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
