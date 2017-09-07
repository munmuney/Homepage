
$(document).ready(function() {

     //event listeners
     $(document).on("click", "#myModal1", handleWebsiteFormSubmit);   //(addWebW, addWebU, addWebG)
     $(document).on("click", "#myModal2", handleGenreFormSubmit); //(addGenreG)
   

        //wrapper has sortable genres (from data)
        $(".wrapper").sortable();
        $(".mysortable").sortable({ connectWith: ".mysortable" });

        //make var for genre name id from html
        var addGenreG = $("#addGenreG");
        //make vars for website inputs from html
        var addWebW = $("#addWebW");
        var addWebU = $("#addWebU");
        var addWebG = $("#addWebG");
        //make wrapper var
        var wrapper = $(".wrapper");

        //this user's id
        var GenreUserId = $("#hiddenclass").html();
        var thisGenreUserId = parseInt(GenreUserId);

        //data array of genres
        var dataArr;
  
        //call genres and their sites
        getGenres();


        /////////FUNCTIONS/////////FUNCTIONS//////////FUNCTIONS///////////

        //define getGenres AND their Websites function
        function getGenres() {
          
          console.log("*******************************************");
          console.log(thisGenreUserId);
          console.log("*******************************************");

          $.get("/genres/" + thisGenreUserId, function(data) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(data);
            dataArr = data;
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            //make sure vals for get genre and get websites are clear
            addGenreG.val("");
            //empty if already full
            wrapper.empty();
            //loop through every member of the data array to get each genre
              for (i = 0; i <data.length; i++){
                  //make main genre div w/class card
                  var maindiv = $("<div class='card'>");
                  //make genre NAME div 
                  var namediv = $("<div class='genre'>");
                  //make title div for inside name div
                  var titlediv = $("<div class='gTitle'>");
                  //make new div for each genre
                  var newd = $("<div>");
                  //should make genre div sortable
                  newd.addClass("mysortable tul");
                  $(".mysortable").sortable({ connectWith: ".mysortable" });
                  //main div appends namediv and then tul div
                  maindiv.append(namediv);
                  maindiv.append(newd);
                  //add main genre div to wrapper
                  wrapper.append(maindiv);
                  //grab genre name
                  var genreName = data[i].name;
                  //add genrename to new genre div
                  titlediv.html(genreName);
                  //add title div to name div
                  namediv.append(titlediv);

                  //grab genre icon if exists
                  if (data[i].iconname){
                    var imgdiv = $("<div class='gTileIcon'>");
                     var genreIcon = data[i].iconname;
                     var icon = $("<img width='40' height='40'>");
                     //give icon the necessary src to link it up to our images genre icons directory
                     icon.attr("src", "img/genre_icons/" + genreIcon);
                     imgdiv.append(icon);
                     //add image div to name div
                     namediv.prepend(imgdiv);
                  }
                  else {
                     var imgdiv = $("<div class='gTileIcon'>");
                     var genreIcon = data[i].iconname;
                     var icon = $("<img>");
                     //give icon the necessary src to link it up to our images genre icons directory
                     icon.attr("src", "img/genre_icons/misc.gif");
                     imgdiv.append(icon);
                     //add image div to name div
                     namediv.prepend(imgdiv);
                  }
                  

                        //loop through every website in each genre if they exist
                    if(data[i].Websites.length) {
                      for (j=0; j< data[i].Websites.length; j++) {
                        //get website name
                        var webName = data[i].Websites[j].name;
                        //get website url
                        var webUrl = data[i].Websites[j].url;
                        //get website logo (png)
                        var webPng = data[i].Websites[j].png;

                        // var webPngfix = webPng.split(' ').join('');

                        //make new div for each site
                        var indiv = $("<div class='one'>");
                        //make a tag with href to website url
                        var ahref = $("<a href='" + webUrl + "' target='_blank'>");
                        //append new website logo div to genre div
                        newd.append(indiv);
                        //grab image tag for logo
                        var logo = $("<img>");
                        //give logo the necessary src to link it up to our images directory
                        logo.attr("src", "img/" + webPng);
                        //add logo to href
                        ahref.append(logo);
                        //put ahref inside div
                        indiv.append(ahref);
                        // //give website div the website name
                        // indiv.html(webName); 
                       $(".mysortable").sortable({ connectWith: ".mysortable" });
                      } //website for loop end
                    } //website if end
                     
                     // var webform = $('<div class="text-right">' + 
                     //                    '<form id="' + data[i].id + '-site-form">' + 
                     //                    '<input placeholder="Enter a Website Name" id="' + data[i].id + '-site-name" type="text" />' +
                     //                    '<input placeholder="Enter a Url" id="' + data[i].id + '-site-url" type="text" />' +
                     //                    '<button type="submit" class="btn btn-success">Add Website</button> ' +     
                     //                 '</form>' +
                     //              ' </div>'); 
                     // newd.append(webform);
                  $(".mysortable").sortable({ connectWith: ".mysortable" });
                 } //genre for loop end
                 
            }); //get function end
          
        }; // getGenres function end


      /////////////////////////////////////////////////////
      // FORM SUBMIT FOR NEW GENRE
      function handleGenreFormSubmit(event) {
          event.preventDefault();
          // Don't do anything if the name fields hasn't been filled out
          if (!addGenreG.val().trim()) {
            return;
          }

          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          // console.log(event);
          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

          addedGenre = addGenreG.val().trim();

          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          // console.log(addedGenre);
          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

          var iconName = addGenreG.val().trim().toLowerCase() + ".gif";

          if (addedGenre === "social media" || addedGenre === "Social Media") {
              addGenre({
              name: addedGenre,
              iconname: "socialmedia.gif",
              userId: thisGenreUserId
            });
          }
          else {
              addGenre({
              name: addedGenre,
              iconname: iconName,
              userId: thisGenreUserId
            });
          }

          

          

      } // handle form submit end

            // POST of new genre
            function addGenre(genreData) {
              $.post("/genres", genreData)
                .then(getGenres);
            } // addGenre function end


      /////////////////////////////////////////////////////
      // (addWebW, addWebU, addWebG)
      // FORM SUBMIT FOR NEW WEBSITE
      function handleWebsiteFormSubmit(event) {
          event.preventDefault();
          // Don't do anything if the name fields hasn't been filled out
          if (!addWebW.val().trim() || !addWebU.val().trim() || !addWebG.val().trim()) {
            return;
          }
          

          for (i=0; i < dataArr.length; i++) {
            console.log(dataArr[i]);
            if(dataArr[i].name.toLowerCase() === addWebG.val().trim().toLowerCase()) {
              addWebsite({
                name: addWebW.val().trim(),
                url: addWebU.val().trim(),
                png: "pcp.png",
                GenreId: dataArr[i].id
              });
            }

          }

          //pass it into the database with its name, url, and genre id
          // addWebsite({
          //   name: addWebW.val().trim(),
          //   url: addWebU.val().trim(),
          //   png: "facebook copy.jpg",
          //   GenreId: webG
          // });

      } // handle form submit end

            // POST of new Website
            function addWebsite(WebsiteData) {
              $.post("/websites", WebsiteData)
                .then(getGenres);
            } // addWebsite function end

             

});
