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
  // NOTE: No backend/endpoint is wired up yet (see the on-page placeholder note).
  // This handler only does client-side validation + a visible status message so the
  // form is demoable. Replace this with a real submit (fetch to Formspree/Netlify/
  // custom API, or a plain <form action="..." method="POST">) once the endpoint
  // is confirmed.
  var form = document.getElementById("demoForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      status.textContent = "Form backend not yet connected — this is a front-end preview only. See the note above the form.";
      status.classList.remove("success");
    });
  }
})();
