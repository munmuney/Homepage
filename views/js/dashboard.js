

$(document).ready(function() {

     //event listeners
     $(document).on("submit", "#genre-form", handleGenreFormSubmit);
     // $(document).on("submit", "#1-site-form", handleWebsiteFormSubmit1);
     // $(document).on("submit", "#2-site-form", handleWebsiteFormSubmit2);
     // $(document).on("submit", "#3-site-form", handleWebsiteFormSubmit3);
     // $(document).on("submit", "#4-site-form", handleWebsiteFormSubmit4);
     // $(document).on("submit", "#5-site-form", handleWebsiteFormSubmit5);
     // $(document).on("submit", "#6-site-form", handleWebsiteFormSubmit6);
     // $(document).on("submit", "#7-site-form", handleWebsiteFormSubmit7);
     // $(document).on("submit", "#8-site-form", handleWebsiteFormSubmit8);
     // $(document).on("submit", "#9-site-form", handleWebsiteFormSubmit9);
     // $(document).on("submit", "#10-site-form", handleWebsiteFormSubmit10);
     // $(document).on("submit", "#11-site-form", handleWebsiteFormSubmit11);
     // $(document).on("submit", "#12-site-form", handleWebsiteFormSubmit12);
     // $(document).on("submit", "#13-site-form", handleWebsiteFormSubmit13);
     // $(document).on("submit", "#14-site-form", handleWebsiteFormSubmit14);
     // $(document).on("click", ".delete-genre", handleDeleteButtonPress);


        //wrapper has sortable genres (from data)
        $(".wrapper").sortable();
        $(".mysortable").sortable({ connectWith: ".mysortable" });

        //make var for genre name id from html
        var nameInput = $("#genre-name");
        //make wrapper var
        var wrapper = $(".wrapper");
  
        //call genres and their sites
        getGenres();


        /////////FUNCTIONS/////////FUNCTIONS//////////FUNCTIONS///////////

        //define getGenres AND their Websites function
        function getGenres() {

          $.get("/genres", function(data) {
            //empty if already full
            wrapper.empty();
            //loop through every member of the data array to get each genre
              for (i = 0; i <data.length; i++){
                  //make new div for each genre
                  var newd = $("<div>");
                  //should make genre div sortable
                  newd.addClass("mysortable tul");
                  $(".mysortable").sortable({ connectWith: ".mysortable" });
                  //add genre div to wrapper
                  wrapper.append(newd);
                  //grab genre name
                  var genreName = data[i].name;
                  //add genrename to new genre div
                  newd.html(genreName);

                  //grab genre icon if exists
                  if (data[i].iconname){
                     var genreIcon = data[i].iconname;
                     var icon = $("<img>");
                     //give icon the necessary src to link it up to our images genre icons directory
                     icon.attr("src", "img/genre_icons/" + genreIcon);
                     //add icon to newd
                     newd.prepend(icon);
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
                  
                 } //genre for loop end
                 
            }); //get function end
          
        }; // getGenres function end


      /////////////////////////////////////////////////////
      // form submit for a new genre
      function handleGenreFormSubmit(event) {
          event.preventDefault();
          // Don't do anything if the name fields hasn't been filled out
          if (!nameInput.val().trim().trim()) {
            return;
          }
          addGenre({
            name: nameInput
              .val()
              .trim()
          });

      } // handle form submit end

            // POST of new genre
            function addGenre(genreData) {
              $.post("/genres", genreData)
                .then(getGenres);
            } // addGenre function end

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        // form submits for a new websites

        //////1/////1/////1//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit1(event) {
        //         event.preventDefault();
        //         var nameInput = $("#1-site-name");
        //         var urlInput = $("#1-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite1({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite1(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////2/////2/////2//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit2(event) {
        //         event.preventDefault();
        //         var nameInput = $("#2-site-name");
        //         var urlInput = $("#2-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite2({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite2(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////3/////3/////3//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit3(event) {
        //         event.preventDefault();
        //         var nameInput = $("#3-site-name");
        //         var urlInput = $("#3-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite3({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite3(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////4/////4/////4//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit4(event) {
        //         event.preventDefault();
        //         var nameInput = $("#4-site-name");
        //         var urlInput = $("#4-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite4({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite4(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////5/////5/////5//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit5(event) {
        //         event.preventDefault();
        //         var nameInput = $("#5-site-name");
        //         var urlInput = $("#5-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite5({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite5(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////6/////6/////6//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit6(event) {
        //         event.preventDefault();
        //         var nameInput = $("#6-site-name");
        //         var urlInput = $("#6-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite6({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite6(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////7/////7/////7//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit7(event) {
        //         event.preventDefault();
        //         var nameInput = $("#7-site-name");
        //         var urlInput = $("#7-site-url");
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite7({
        //           name: nameInput.val().trim(),

        //           url: urlInput.val().trim()

        //         });

        //     } // handle form submit end

        //       function addWebsite7(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////8/////8/////8//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit8(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite8({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite8(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////9/////9/////9//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit9(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite9({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite9(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////10/////10/////10//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit10(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite10({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite10(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////11/////11/////11//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit11(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite11({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite11(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////12/////12/////12//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit12(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite12({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite12(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////13/////13/////13//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit13(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite13({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite13(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end

        // //////14/////14/////14//////////////////////////////////////////////////////
        //       function handleWebsiteFormSubmit14(event) {
        //         event.preventDefault();
        //         // Don't do anything if the name fields hasn't been filled out
        //         if (!nameInput.val().trim().trim()) {
        //           return;
        //         }
        //         addWebsite14({
        //           name: nameInput
        //             .val()
        //             .trim()
        //         });

        //     } // handle form submit end

        //       function addWebsite14(genreData) {
        //         $.post("/genres", genreData)
        //           .then(getGenres);
        //       } // addWebsite function end



       // function handleDeleteButtonPress() {
       //      var listItemData = $(this).parent("td").parent("tr").data("author");
       //      var id = listItemData.id;
       //      $.ajax({
       //        method: "DELETE",
       //        url: "/api/authors/" + id
       //      })
       //      .done(getGenres);
       //    }
        
             

});

