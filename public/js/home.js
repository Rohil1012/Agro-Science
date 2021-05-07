    var show = document.getElementById("nav-links");
    function showMenu() {
      show.style.top = "0";

    }
    function closeMenu() {
      show.style.top = "-850px";

    }
    function navigate() {
      window.location = "/login"
    }
    function logout() {
      window.location = "/logout"
    }
  </script>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init();