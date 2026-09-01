(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Demo request form
  // No hosted form backend (Formspree/Netlify/custom API) has been chosen yet,
  // so this submits via a mailto: link to the real ABHAY inbox as a working
  // interim path. Swap this for a fetch() to a real endpoint once one exists.
  var form = document.getElementById("demoForm");
  var status = document.getElementById("formStatus");
  var DEMO_REQUEST_EMAIL = "anuragg@chipiotembedded.com";

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var name = document.getElementById("fName").value.trim();
      var company = document.getElementById("fCompany").value.trim();
      var segment = document.getElementById("fSegment").value;
      var phone = document.getElementById("fPhone").value.trim();
      var message = document.getElementById("fMessage").value.trim();

      var subject = "ABHAY Demo Request — " + company;
      var body = [
        "Name: " + name,
        "Company: " + company,
        "Segment: " + segment,
        "Phone: " + phone,
        "",
        "Message:",
        message || "(none)"
      ].join("\n");

      window.location.href = "mailto:" + DEMO_REQUEST_EMAIL
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body);

      status.textContent = "Opening your email app to send this to " + DEMO_REQUEST_EMAIL + ". If nothing opens, email us directly.";
      status.classList.add("success");
    });
  }
})();
