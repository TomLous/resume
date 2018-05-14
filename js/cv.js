(function ($) {
    "use strict"; // Start of use strict

    function parseFile(url, handler){
        Papa.parse(url,{
            download: true,
            delimiter: ",",
            header:true,
            skipEmptyLines: true,
            complete: function(results) {
                handler(results.data)
            }
        })
    }

    function sortCompare(field, asc) {
        asc = typeof asc !== 'undefined' ? asc : true;
        var dir = asc ? 1  : -1;

         return function(a,b) {
            if (a[field] < b[field])
                return (-1 * dir);
            if (a[field] > b[field])
                return (1 * dir);
            return 0;
        }
    }


    // Profile
    parseFile('cv/export/Profile.csv', function(data) {
            //Address,Birth Date,Contact Instructions,,Summary,Industry,Country,Zip Code,Geo Location,Twitter Handles,Websites,Instant Messengers
        //Berkel & Rodenrijs (Rotterdam Area),"Aug 11, 1979",,"Spark & Scala, all day, every day. ",,Netherlands,2651,"Berkel en Rodenrijs, South Holland Province, Netherlands",tomlous,"COMPANY:http://www.datlinq.com/en/, OTHER:https://github.com/TomLous, OTHER:http://stackoverflow.com/users/1444286/tom-lous",SKYPE:tom.lous
            var pData = data[0]


            $('.first-name').text(pData['First Name']);
            $('.last-name').text(pData['Last Name']);
            $('.headline').text(pData['Headline'].replace("- available for contracts",""));
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
            $('#summary').html(pData['Summary'].replace(/\-/ig, "<br>"));
    });

    // Email
    parseFile('cv/export/Email Addresses.csv', function(data) {
        var primary = data.filter(function (record) {
            return record['Primary'] === 'Yes';
        });
        var emailAddress = primary[0]['Email Address'];
        $('.email-address').text(emailAddress).attr('href', 'mailto:' + emailAddress);
    });

    // Phone
    parseFile('cv/export/Phone Numbers.csv', function(data) {
        var phone = data[0]['Number'];
        $('.phone').text(phone);
    });

    // Positions
    parseFile('cv/export/Positions.csv', function(data) {
        var source   = document.getElementById("position-template").innerHTML;
        var template = Handlebars.compile(source);

        for(var i in data){
            var position = data[i];
            var context = {
                title: position['Title'] + ' at ' + position['Company Name'],
                from: position['Started On'],
                to: position['Finished On'] === "" ? "Present" : position['Finished On'],
                body: position['Description'].replace(/ \-/ig, "<br> -")
                // body: ''
            };
            var html = template(context);
            $("#positions").append(html);
        }
    });

    // Skills
    parseFile('cv/export/Skills.csv', function(data) {
        var smallList = data.slice(0,18);

        for(var i in smallList){
            var skill = smallList[i]["Name"];
            $(".keySkills").append($("<li>").text(skill));
        }
    });

    // Certification
    parseFile('cv/export/Certifications.csv', function(data) {
        var source   = document.getElementById("certification-template").innerHTML;
        var template = Handlebars.compile(source);

        var comp = sortCompare('time', false);

        var sorted = data.map(function (obj) {
            obj['time'] = new Date(obj['Start Date']).getTime()
            return obj;
        }).sort(comp);

        for(var i in sorted){
            var cert = sorted[i];
            var context = {
                title: cert['Name'],
                date: cert['Start Date'],
                url: cert['Url']
            };
            var html = template(context);
            $("#certifications").append(html);

        }
    });

    // Courses
    parseFile('cv/export/Courses.csv', function(data) {
        var source   = document.getElementById("course-template").innerHTML;
        var template = Handlebars.compile(source);


        for(var i in data){
            var course = data[i];
            var context = {
                title: course['Name']
            };
            var html = template(context);
            $("#courses").append(html);

        }
    });

    // Education
    parseFile('cv/export/Education.csv', function(data) {
        var source   = document.getElementById("education-item-template").innerHTML;
        var template = Handlebars.compile(source);

        //School Name,Start Date,End Date,Notes,Degree Name,Activities
        var comp = sortCompare('time', false);

        var sorted = data.map(function (obj) {
            obj['time'] = new Date(obj['Start Date']).getTime()
            return obj;
        }).sort(comp).filter(function (obj) {
            console.log(obj)
            return obj['Activities'].trim() !== "-"
        });

        for(var i in sorted){
            var edu = sorted[i];
            var title = edu['Activities'] === "" ? edu['School Name'] : edu['Activities'] + ' at ' + edu['School Name'];
            var context = {
                title: title,
                from: edu['Start Date'],
                degree: edu['Degree Name'],
                to: edu['End Date'] === "" ? "Present" : edu['End Date'],
                body: edu['Notes'].replace(/ \-/ig, "<br> -")
            };
            var html = template(context);
            $("#education").append(html);

        }
    });



    // Honors

    // Languages

    // Projects
    //Title,Description,Url,Start Date,End Date
    parseFile('cv/export/Projects.csv', function(data) {
        var source   = document.getElementById("project-template").innerHTML;
        var template = Handlebars.compile(source);

        var comp = sortCompare('time', false);

        var sorted = data.map(function (obj) {
            obj['time'] = new Date(obj['Start Date']).getTime()
            return obj;
        }).sort(comp).slice(0,7);

        var newSorted = [];

        for(var i in sorted){
            var project = sorted[i];
            if(project['Title'] == "Spark Big Data Pipeline"){
                newSorted.unshift(project)
            }
            else{
                newSorted[i] = project
            }
        }




        for(var i in sorted){
            var project = newSorted[i];

            var context = {
                title: project['Title'],
                from: project['Start Date'],
                url: project['Url'],
                to: project['End Date'] == project['Start Date'] ? null : (project['End Date'] === ""  ? "Present" : project['End Date']),
                body: project['Description'].replace(/ \-/ig, "<br> -")
            };
            var html = template(context);
            $("#projects").append(html);
        }
    });

    // Publications



})(jQuery); // End of use strict