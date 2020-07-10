const selectors = {

    randomize: function(tab) {
        let i, j, tmp;

        for (i = tab.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }

        return tab;
    },

    randomNumber: function (maximumNumber, minimumNumber) {
        return Math.floor(Math.random() * (maximumNumber - minimumNumber + 0)) + minimumNumber;
    },

}