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

    parseFile("cv/export/Profile.csv", function(results) {
            //First Name,Last Name,Maiden Name,Address,Birth Date,Contact Instructions,Headline,Summary,Industry,Country,Zip Code,Geo Location,Twitter Handles,Websites,Instant Messengers
            var pData = results.data[0]
            console.log(pData);

            $(".first-name").text(pData["First Name"]);
            $(".last-name").text(pData["Last Name"]);


        }
    )

})(jQuery); // End of use strict