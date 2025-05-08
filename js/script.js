$(document).ready(function () {
  // Fetch data from Numbers API
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      $("#numbers-api-content").text(data.text);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(
        "Error fetching Numbers API data:",
        textStatus,
        errorThrown
      );
      $("#numbers-api-content").text(
        "Sorry, we couldn't load the interesting fact right now."
      );
    },
  });

  // Image Upload Logic
  let dropArea = $("#drop-area");
  let fileElem = $("#fileElem");
  let uploadStatus = $("#upload-status");
  let gallery = $("#gallery");

  // Prevent default drag behaviors
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.on(eventName, function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // Highlight drop area when item is dragged over it
  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.on(eventName, function () {
      dropArea.addClass("hover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.on(eventName, function () {
      dropArea.removeClass("hover");
    });
  });

  // Handle dropped files
  dropArea.on("drop", function (e) {
    let dt = e.originalEvent.dataTransfer;
    let files = dt.files;
    handleFiles(files);
  });

  // Handle click on drop area to trigger file input
  dropArea.on("click", function () {
    fileElem[0].click(); // FIX: Use DOM element's click method to prevent recursion
  });

  fileElem.on("change", function () {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    uploadStatus.empty(); // Clear previous status
    gallery.empty(); // Clear previous previews

    if (files.length === 0) {
      uploadStatus.html(
        "<div class='alert alert-warning'>No files selected.</div>"
      );
      return;
    }

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (!file.type.startsWith("image/")) {
        uploadStatus.append(
          "<div class='alert alert-danger'>File '" +
            file.name +
            "' is not an image.</div>"
        );
        continue;
      }
      previewFile(file);
      uploadFile(file);
    }
  }

  function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = $("<img>")
        .attr("src", reader.result)
        .addClass("img-fluid col-md-3 col-sm-6 mb-3");
      gallery.append(img);
    };
  }

  function uploadFile(file) {
    let formData = new FormData();
    formData.append("uploadedImage", file); // "uploadedImage" should match the name in multer on the backend

    uploadStatus.append(
      "<div class='alert alert-info'>Uploading " + file.name + "...</div>"
    );

    $.ajax({
      url: "/upload", // The backend endpoint
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        uploadStatus.find(".alert-info:contains('" + file.name + "')").remove(); // Remove loading message
        uploadStatus.append(
          "<div class='alert alert-success'>File '" +
            file.name +
            "' uploaded successfully!</div>"
        );
        console.log("File uploaded successfully:", response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        uploadStatus.find(".alert-info:contains('" + file.name + "')").remove(); // Remove loading message
        uploadStatus.append(
          "<div class='alert alert-danger'>Failed to upload '" +
            file.name +
            "'. Reason: " +
            (jqXHR.responseJSON ? jqXHR.responseJSON.message : errorThrown) +
            "</div>"
        );
        console.error(
          "Error uploading file:",
          textStatus,
          errorThrown,
          jqXHR.responseText
        );
      },
    });
  }

  // Smooth scrolling for nav links
  $("header .nav-link[href^='#']").on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 60, // Adjust for fixed header height
          },
          800
        );
    }
  });

  // Simple fade-in animation for sections on scroll
  // 1. Add the class that makes sections initially hidden and ready for animation
  $("main > section").addClass("fade-in-section");

  // 2. Now select these sections
  const sectionsToObserve = $(".fade-in-section");

  const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of item is visible
  };

  function observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $(entry.target).addClass("visible");
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 3. Observe the selected sections
  sectionsToObserve.each(function () {
    observer.observe(this);
  });
});
