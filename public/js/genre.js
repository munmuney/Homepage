

$(document).ready(function() {

        //wrapper has sortable genres (from data)
        $(".wrapper").sortable();
        $(".mysortable").sortable({ connectWith: ".mysortable" });

        //make wrapper var
        var wrapper = $(".wrapper");
  
        //call genres and their sites
        getGenres();

        //define getGenres function
        function getGenres() {

          $.get("/genres", function(data) {
            //loop through every member of the data array to get each genre
              for (i = 0; i <data.length; i++){
                //make new div for each genre
                var newd = $("<div>");
                //should make genre div sortable
                newd.addClass("mysortable tul");
                $(".mysortable").sortable({ connectWith: ".mysortable" });
                //add genre div to wrapper
                  wrapper.append(newd);

                      //loop through every website in each genre
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
                      }
                  
                 }
                 
            });
          
        };

     

});


  // A function to handle what happens when the form is submitted to create a new Author
  // function handleAuthorFormSubmit(event) {
  //   event.preventDefault();
  //   // Don't do anything if the name fields hasn't been filled out
  //   if (!nameInput.val().trim().trim()) {
  //     return;
  //   }
  //   // Calling the upsertAuthor function and passing in the value of the name input
  //   upsertAuthor({
  //     name: nameInput
  //       .val()
  //       .trim()
  //   });
  // }
