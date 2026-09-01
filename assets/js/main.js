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

  // Demo request form — submits leads to the ABHAY Leads public intake endpoint.
  // The token in this URL is a write-only "create lead" token, safe to embed
  // in public client-side JS (it cannot read, update, or delete anything).
  var LEAD_INTAKE_URL = "https://server.tail9f05c4.ts.net/public/intake/F9_sfVExt04at5T344_7mTfqWwHC0L6lDzD8JeBjDJc";

  var form = document.getElementById("demoForm");
  var status = document.getElementById("formStatus");
  var submitBtn = form ? form.querySelector("button[type=submit]") : null;

  async function submitLead(data) {
    var resp;
    try {
      resp = await fetch(LEAD_INTAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } catch (err) {
      return { success: false, message: "Couldn't reach the server — check your connection and try again." };
    }

    if (resp.ok) return { success: true };
    if (resp.status === 429) return { success: false, message: "Too many submissions — please try again shortly." };
    return { success: false, message: "Something went wrong — please try again." };
  }

  if (form && status && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = {
        name: document.getElementById("fName").value.trim(),
        company: document.getElementById("fCompany").value.trim(),
        email: document.getElementById("fEmail").value.trim(),
        phone: document.getElementById("fPhone").value.trim(),
        segment: document.getElementById("fSegment").value,
        message: document.getElementById("fMessage").value.trim(),
        website: document.getElementById("fWebsite").value
      };

      submitBtn.disabled = true;
      status.classList.remove("success");
      status.textContent = "Sending…";

      submitLead(data).then(function (result) {
        submitBtn.disabled = false;
        if (result.success) {
          status.textContent = "Thanks — we'll be in touch shortly.";
          status.classList.add("success");
          form.reset();
        } else {
          status.textContent = result.message;
        }
      });
    });
  }
})();
