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

  // Dark mode toggle — persisted to localStorage; initial theme is applied by an
  // inline script in <head> before first paint, this just handles the click.
  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
      try {
        localStorage.setItem("abhay-theme", isDark ? "light" : "dark");
      } catch (e) {}
    });
  }

  // Accordions — #problem items and #segments cards. Content stays in the DOM at
  // all times (crawlable); only the open/closed visual state toggles on click.
  document.querySelectorAll("[data-accordion]").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Scroll-triggered fade-up for section headings + the how-it-works connector lines
  var revealTargets = document.querySelectorAll(".fade-up, [data-observe]");
  if (revealTargets.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      revealTargets.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealTargets.forEach(function (el) {
        el.classList.add("in-view");
      });
    }
  }

  // "See ABHAY in Action" video carousel — one clip loaded/playing at a time.
  // Videos have no src on page load (only data-src); nothing is fetched until
  // the carousel scrolls into view, and switching slides unloads the outgoing
  // clip's src so at most one video is ever buffered.
  var carousel = document.querySelector("[data-video-carousel]");
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".video-slide"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".video-dot"));
    var playPauseBtn = carousel.querySelector("[data-video-playpause]");
    var muteBtn = carousel.querySelector("[data-video-mute]");
    var currentIndex = 0;
    var isMuted = true;

    var getVideo = function (index) {
      return slides[index].querySelector("video");
    };

    var updatePlayPauseIcon = function (isPlaying) {
      if (!playPauseBtn) return;
      var pauseIcon = playPauseBtn.querySelector(".icon-pause");
      var playIcon = playPauseBtn.querySelector(".icon-play");
      if (pauseIcon) pauseIcon.hidden = !isPlaying;
      if (playIcon) playIcon.hidden = isPlaying;
      playPauseBtn.setAttribute("aria-label", isPlaying ? "Pause video" : "Play video");
    };

    var updateMuteIcon = function () {
      if (!muteBtn) return;
      var mutedIcon = muteBtn.querySelector(".icon-muted");
      var unmutedIcon = muteBtn.querySelector(".icon-unmuted");
      if (mutedIcon) mutedIcon.hidden = !isMuted;
      if (unmutedIcon) unmutedIcon.hidden = isMuted;
      muteBtn.setAttribute("aria-label", isMuted ? "Unmute video" : "Mute video");
    };

    var unloadSlide = function (index) {
      var video = getVideo(index);
      if (!video) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    var loadAndPlay = function (index) {
      var video = getVideo(index);
      if (!video) return;
      var src = video.getAttribute("data-src");
      if (src && video.getAttribute("src") !== src) {
        video.src = src;
        video.load();
      }
      video.muted = isMuted;
      video.play().catch(function () {});
    };

    var goToSlide = function (index) {
      if (index === currentIndex) return;
      unloadSlide(currentIndex);
      slides[currentIndex].classList.remove("is-active");
      if (dots[currentIndex]) {
        dots[currentIndex].classList.remove("is-active");
        dots[currentIndex].setAttribute("aria-selected", "false");
      }
      currentIndex = index;
      slides[currentIndex].classList.add("is-active");
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add("is-active");
        dots[currentIndex].setAttribute("aria-selected", "true");
      }
      loadAndPlay(currentIndex);
    };

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goToSlide(i);
      });
    });

    if (playPauseBtn) {
      playPauseBtn.addEventListener("click", function () {
        var video = getVideo(currentIndex);
        if (!video) return;
        if (video.paused) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    }

    // Drive the play/pause icon from the video's actual state, not an optimistic
    // guess — covers autoplay being blocked, buffering, or a slide switch.
    slides.forEach(function (slide, index) {
      var video = getVideo(index);
      if (!video) return;
      video.addEventListener("play", function () {
        if (index === currentIndex) updatePlayPauseIcon(true);
      });
      video.addEventListener("pause", function () {
        if (index === currentIndex) updatePlayPauseIcon(false);
      });
    });

    if (muteBtn) {
      muteBtn.addEventListener("click", function () {
        isMuted = !isMuted;
        var video = getVideo(currentIndex);
        if (video) video.muted = isMuted;
        updateMuteIcon();
      });
    }

    updateMuteIcon();
    updatePlayPauseIcon(false);

    if ("IntersectionObserver" in window) {
      var carouselObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              loadAndPlay(currentIndex);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.35 }
      );
      carouselObserver.observe(carousel);
    } else {
      loadAndPlay(currentIndex);
    }
  }

  // Lightbox for the how-it-works hardware thumbnail strip
  var lightbox = document.getElementById("imgLightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  if (lightbox && lightboxImg) {
    document.querySelectorAll("[data-lightbox-src]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        lightboxImg.src = trigger.getAttribute("data-lightbox-src");
        lightboxImg.alt = trigger.getAttribute("data-lightbox-alt") || "";
        lightbox.showModal();
      });
    });

    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        lightbox.close();
      });
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener("close", function () {
      lightboxImg.src = "";
    });
  }

  // Video modal for the hero explainer film
  var videoModal = document.getElementById("videoModal");
  var videoModalPlayer = document.getElementById("videoModalPlayer");
  if (videoModal && videoModalPlayer) {
    document.querySelectorAll("[data-video-lightbox-src]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        videoModalPlayer.poster = trigger.getAttribute("data-video-lightbox-poster") || "";
        videoModalPlayer.src = trigger.getAttribute("data-video-lightbox-src");
        videoModal.showModal();
        videoModalPlayer.play();
      });
    });

    videoModal.querySelectorAll("[data-video-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        videoModal.close();
      });
    });

    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) videoModal.close();
    });

    videoModal.addEventListener("close", function () {
      videoModalPlayer.pause();
      videoModalPlayer.src = "";
    });
  }
})();
