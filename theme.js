const theme = {

    switchTheme: function() {
        let theme = document.querySelector('#theme');
        let themeButton = document.querySelector('.header__right'); 

        if (theme.getAttribute("href") == "style-day.css") {
          theme.href = "style-night.css";

          themeButton.classList.replace('circle__game--black', 'circle__game--white');

        } else {
          theme.href = "style-day.css";

          themeButton.classList.replace('circle__game--white', 'circle__game--black');

        }
    },
}