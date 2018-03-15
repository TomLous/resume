(function ($) {
    "use strict"; // Start of use strict

    console.log("done")

    function parseFile(url, handler){
        Papa.parse(url,{
            download: true,
            delimiter: ",",
            header:true,
            skipEmptyLines: true,
            complete: function(results) {
                handler(results)
            }
        })
    }

    // Profile
    parseFile('cv/export/Profile.csv', function(results) {
            //Address,Birth Date,Contact Instructions,,Summary,Industry,Country,Zip Code,Geo Location,Twitter Handles,Websites,Instant Messengers
        //Berkel & Rodenrijs (Rotterdam Area),"Aug 11, 1979",,"Spark & Scala, all day, every day. ",,Netherlands,2651,"Berkel en Rodenrijs, South Holland Province, Netherlands",tomlous,"COMPANY:http://www.datlinq.com/en/, OTHER:https://github.com/TomLous, OTHER:http://stackoverflow.com/users/1444286/tom-lous",SKYPE:tom.lous
            var pData = results.data[0]
            console.log(pData);

            $('.first-name').text(pData['First Name']);
            $('.last-name').text(pData['Last Name']);
            $('.headline').text(pData['Headline']);
            var websites = {};
            pData['Websites'].split(', ').map(function (str) {
                var kv = str.split(':');
                var key = kv.shift();
                var val = kv.join(':');
                if (!websites.hasOwnProperty(key)) {
                    websites[key] = val;
                }
            });
            var website = '#';
            if(websites.hasOwnProperty('PERSONAL')){
                website = websites['PERSONAL']
            }else if(websites.hasOwnProperty('PORTFOLIO')){
                website = websites['PORTFOLIO']
            }else if(websites.hasOwnProperty('BLOG')){
                website = websites['BLOG']
            }else if(websites.hasOwnProperty('OTHER')){
                website = websites['OTHER']
            }else if(websites.hasOwnProperty('COMPANY')){
                website = websites['COMPANY']
            }
            $('.website').text(website).attr('href', website);
    });

    // Email
    parseFile('cv/export/Email Addresses.csv', function(results) {
        var primary = results.data.filter(function (record) {
            return record['Primary'] === 'Yes';
        });
        var emailAddress = primary[0]['Email Address'];
        $('.email-address').text(emailAddress).attr('href', 'mailto:' + emailAddress);
    });

    // Phone
    parseFile('cv/export/Phone Numbers.csv', function(results) {
        var phone = results.data[0]['Number'];
        $('.phone').text(phone);
    });


})(jQuery); // End of use strict