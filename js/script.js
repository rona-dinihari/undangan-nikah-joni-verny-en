$(document).ready(function () {
  // --- Countdown Logic ---
  const weddingDate = new Date("April 19, 2026 09:00:00").getTime();

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    $("#days").text(d < 10 ? "0" + d : d);
    $("#hours").text(h < 10 ? "0" + h : h);
    $("#minutes").text(m < 10 ? "0" + m : m);
    $("#seconds").text(s < 10 ? "0" + s : s);

    if (distance < 0) {
      clearInterval(timer);
      $("#timer").html("<h3>HARI BAHAGIA TELAH TIBA!</h3>");
    }
  }, 1000);

  // --- Copy to Clipboard ---
  $("#btnCopy").on("click", function () {
    const textToCopy = "12374892";
    const tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val(textToCopy).select();
    document.execCommand("copy");
    tempInput.remove();

    showToast("Nomor rekening berhasil disalin!");
  });

  // --- Chat System ---
  $("#wishForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#guestName").val();
    const msg = $("#guestMsg").val();

    const newBubble = `
                    <div class="bubble bubble-pink animate__animated animate__fadeInUp">
                        <span class="bubble-name">Anda (${name})</span>
                        ${msg}
                    </div>
                `;

    $("#chatDisplay").prepend(newBubble);
    $("#guestName").val("");
    $("#guestMsg").val("");

    showToast("Terima kasih atas ucapannya!");

    // Scroll to top of chat box
    $("#chatDisplay").animate({ scrollTop: 0 }, "slow");
  });

  // --- Toast Helper ---
  function showToast(msg) {
    $("#toastMsg").text(msg);
    const toast = new bootstrap.Toast(
      document.getElementById("liveToast"),
    );
    toast.show();
  }

  // --- Smooth Scroll ---
  $("a.nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
      );
    }
  });
});
