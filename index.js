const app = {


    // only unique color are available, and no empty case yet.

    // nbPossibilities 4 to 6 it's recommended
    nbPossibilities: 4,
    
    // With 4 Possibilities if u put 8 colors you can resolve it in 8 tries if u put 10, 10 tries max.
    // if u put 6 possibilities i recommend u to put a max of 8 nbTries.
    nbTries: 10,

    // colors list => 
    // ['red', 'blue', 'yellow', 'green', 'purple', 'pink', 'orange', 'lightskyblue', 'brown', 'grey'],

    colors: ['red', 'blue', 'yellow', 'green', 'purple', 'pink', 'orange', 'lightskyblue', 'brown', 'grey'],


    // Please don't change these values.

    colorsShow: false,
    userPlay: [],
    userTemplate: {},
    solution: [],
    startGame: false,
    userWin: false,

    title: 'Mastermind',




    init: function () 
    {
        console.log('app init !');

        app.generateHeader();

        if (!app.userPlay.length){
            let startNewGame = document.querySelector('#startNewGame');

            startNewGame.addEventListener('click', app.startNewGame);

        }else{

            app.clean();
            app.generateHeader();

            if (app.userWin === true){

                app.generatePreviousTries();

            }else if((app.nbTries <= app.userPlay.length) && (app.userWin === false)){
                
                app.generatePreviousTries();

            }else {

                app.generateBoardGame();
                app.generatePreviousTries();
            }
        }

    },


    /**
     * Start a new MasterMind game
     */
    startNewGame: function () 
    {
        console.log('startNewGame');

        app.startGame = true;
    
        app.generateSolution();
        app.generateHeader();
        app.generateBoardGame();
    },


    /**
     * Generate the header
     * 
     * at the end of the game the solution will be displayed on the Header.
     */
    generateHeader: function ()
    {
        console.log('generateHeader')

        const headerLeft = document.querySelector('.header__left');
        const headerCenter = document.querySelector('.header__title');
        const headerRight = document.querySelector('.header__right');
        
        if ((app.startGame === true) && (app.nbTries > app.userPlay.length) && (app.userWin != true)){

            headerCenter.textContent = app.title;
            headerLeft.textContent = app.userPlay.length+1 + ' \\ ' + app.nbTries;
            
        }else if (app.userWin === true){

            headerCenter.textContent = 'VICTOIRE';
            headerLeft.textContent = app.userPlay.length + ' \\ ' + app.nbTries;

            app.displayPlayAgainButton(); 
            app.displaySolution();

        }else if((app.nbTries == app.userPlay.length) && (app.userWin === false)){

            headerCenter.textContent = 'DEFAITE';
            headerLeft.textContent = app.userPlay.length + ' \\ ' + app.nbTries;

            app.displayPlayAgainButton(); 
            app.displaySolution();

        }else {
            headerCenter.textContent = app.title;
            // headerLeft.textContent = app.userPlay.length + 1 + ' \\ ' + app.nbTries;

        }
    },


    /**
     * Generate one solution.
     * 
     * No params: only unique color yet.
     */
    generateSolution: function () 
    {
        console.log('generateSolution');

        const newSolution = [];
    
        for (let i = 0; i < app.nbPossibilities; i += 1) {
          let number = selectors.randomNumber(0, (app.colors.length));
    
          while (newSolution.includes(app.colors[number])) {
            number = selectors.randomNumber(0, (app.colors.length));
          }
    
          newSolution.push(app.colors[number]);
        }

        app.solution = newSolution;

    },



    /**
     * Clean HTML
     */
    clean: function () {
        console.log('clean');

        let cleanTop = document.querySelector('.main__top');
            //cleanTop.innerText = '';
            cleanTop.textContent = '';
        let cleanCenter = document.querySelector('.main__center');
            cleanCenter.textContent = '';
        let cleanBottom = document.querySelector('.main__bottom');
            cleanBottom.textContent = '';

            const headerBottom = document.querySelector('.header__bot');
            headerBottom.textContent = '';

    },


    /**
     * 
     */
    generateBoardGame: function () {
        console.log('generateBoardGame');

        app.clean();
        app.generateColorsPaletteParent();
        app.genreateUserPlay();
        
    },


    genreateUserPlay: function () {
        console.log('genreateUserPlay');
    
        let clonedTemplateFragment = document.getElementById('empty-mastermind').content.cloneNode(true);
       
        let mastermind = clonedTemplateFragment.querySelector('.mastermind__template');
        mastermind.classList.add('user');

        document.querySelector('.main__center').appendChild(mastermind);

        let userleft = mastermind.querySelector('.mastermind__left');
        let createUserleft = document.createElement("span");
        createUserleft.textContent = app.userPlay.length + 1;
        userleft.appendChild(createUserleft);

        let userPossibilities = mastermind.querySelector('.mastermind__center');
        for (let i = 0; i < app.nbPossibilities; i += 1) {

            let createUserPossibilities = document.createElement("span");
                createUserPossibilities.setAttribute('class', 'circle circle__game');
                createUserPossibilities.dataset.color = '';
                createUserPossibilities.setAttribute('id', 'possibilities-' + (i + 1));

            userPossibilities.appendChild(createUserPossibilities);

            createUserPossibilities.addEventListener('click', app.generateColorsPaletteChilds);
            //document.querySelector('.mastermind__userPlay').appendChild(userPossibilities);

        }

        let validateButton = document.querySelector('#validTry');
        validateButton.addEventListener('click', app.handleClickValidate);

    },


    cleanColorsPalette: function () {

        console.log('cleanColorsPalette');
    
        const emplacementColorsPalettef = document.querySelector('.colorsPalette');
        emplacementColorsPalettef.textContent = '';

    },


    generateColorsPaletteParent: function () {

        console.log('generateColorsPalette');

        const emplacement = document.querySelector('.main__top');
        //const ts = document.querySelector('.mastermind__user');

        let colorsPaletteParent = document.createElement("span");
            colorsPaletteParent.setAttribute('class', 'colorsPalette hide');
        
        emplacement.appendChild(colorsPaletteParent);

    },


    generateColorsPaletteChilds: function (event) {

        console.log('generateColorsPaletteChilds: ', event);

        const parentId = event.target.id;

        const addColorTarget = document.querySelector('#' + parentId);
        addColorTarget.setAttribute('class', 'circle circle__game');    
        addColorTarget.dataset.color = "";

        const emplacementColorsPalette = document.querySelector('.colorsPalette');
        app.cleanColorsPalette()
        for (let i = 0; i < app.colors.length; i += 1) {

        let colorsPaletteChilds = document.createElement("span");
            colorsPaletteChilds.setAttribute('class', 'circle circle__game circle__game--' + app.colors[i]);
            colorsPaletteChilds.setAttribute('id', app.colors[i]);

            emplacementColorsPalette.appendChild(colorsPaletteChilds);
        
            colorsPaletteChilds.addEventListener('click', (event) => app.handleClickOnColor(parentId, event));
        } 

    },


    handleClickOnColor: function (parentId, event) {
        console.log('handleClickOnColor: ', event);
        console.log('handleClickOnColor -> Parent: ', parentId);


        app.cleanColorsPalette();


        const addColorTarget = document.querySelector('#' + parentId);
        
        addColorTarget.dataset.color = event.target.id;
        addColorTarget.setAttribute('class', 'circle circle__game circle__game--' + event.target.id)

    },


    displayPlayAgainButton: function () {

        const footerElement = document.querySelector('.footer');
        footerElement.textContent = '';

        let buttonPlayAgain = document.createElement("span");
        buttonPlayAgain.setAttribute('class', 'button__tryAgain');
        buttonPlayAgain.textContent = 'Rejouer';

        footerElement.appendChild(buttonPlayAgain);

        footerElement.addEventListener('click', app.playAgain);

    },


    playAgain: function () {

        app.userPlay = [];
        app.solution = [];
        app.startGame = true;
        app.userWin = false;

        app.startNewGame();
        
    },


    handleClickValidate: function (event) {
        console.log('handleClickValidate:', event);

        const uservalue = event.target.closest('.main__center .mastermind__template')

        userColorsValue = uservalue.querySelectorAll('.mastermind__center .circle')

        userColors = []
        for (let i = 0; i < userColorsValue.length; i += 1) {
            console.log('userColorsValue.dataset') 
        console.log(userColorsValue[i].dataset.color)

            userColors.push(userColorsValue[i].dataset.color)
        }

        app.compareWithSolution(userColors);

    },


    compareWithSolution: function (userColors){
        console.log('compareWithSolution');

        let userhelpData = [];
        let userWinCounter = 0;
        for (let i = 0; i < userColors.length; i += 1) {
        
            if (app.solution[i] == userColors[i]) {

                userWinCounter += 1;
                userhelpData.push('goodPlace')
                
                if(userWinCounter == 4){
                    app.userWin = true;
                    console.log('userWinCounter', userWinCounter)
                    console.log('app.userWin', app.userWin)
                }
            }else if  (app.solution.includes(userColors[i])) {
                userhelpData.push('wrongPlace')
            }else{
                userhelpData.push('')
            }

        }
        
        app.userPlay.push({
            userPlayColor: userColors,
            userPlayHelp: selectors.randomize(userhelpData),
        }) 

        app.init();
    },


    generatePreviousTries: function () {
        console.log('generatePreviousTries')

        for (let i = 0; i < app.userPlay.length; i += 1) {

            let clonedTemplateFragment = document.getElementById('empty-mastermind').content.cloneNode(true);

            let mastermind = clonedTemplateFragment.querySelector('.mastermind__template');


            let userleft = mastermind.querySelector('.mastermind__left');
            let createUserleft = document.createElement("span");
            createUserleft.textContent = i + 1;
            userleft.appendChild(createUserleft);

            let userPossibilities = mastermind.querySelector('.mastermind__center');

                for (let j = 0; j < app.userPlay[i].userPlayColor.length; j += 1) {

                    let createUserPossibilities = document.createElement("span");
                        createUserPossibilities.setAttribute('class', 'circle circle__game circle__game--' + app.userPlay[i].userPlayColor[j]);
                        createUserPossibilities.dataset.color = app.userPlay[i].userPlayColor[j];

                    userPossibilities.appendChild(createUserPossibilities);
                    //document.querySelector('.mastermind__userPlay').appendChild(userPossibilities);

                }

            let userAnwsers = mastermind.querySelector('.mastermind__right');
            userAnwsers.textContent = '';   
                for (let j = 0; j < app.userPlay[i].userPlayHelp.length; j += 1) {

                    if(app.userPlay[i].userPlayHelp[j] == 'wrongPlace') {
                        var circleHelpColor = 'circle__help--black';
                    }else if (app.userPlay[i].userPlayHelp[j] == 'goodPlace') {
                        var circleHelpColor = 'circle__help--white';
                    }else {
                        var circleHelpColor = '';
                    }

                    let createUserAnwsers = document.createElement("span");
                        createUserAnwsers.setAttribute('class', 'circle circle__help ' + circleHelpColor);

                        userAnwsers.appendChild(createUserAnwsers);
                        //document.querySelector('.mastermind__userPlay').appendChild(userPossibilities);
                } 

                if (i === 0) {
                    const parentElement = document.querySelector('.main__bottom');
                    console.log('parentElement', parentElement)
                    parentElement.appendChild(mastermind);
                }else{

                    const parentElement = document.querySelector('.main__bottom');
                    const parentElementFirstElement = document.querySelector('.main__bottom').firstElementChild;
                    console.log('parentElementFirstElement', parentElementFirstElement)
                    parentElement.insertBefore(mastermind, parentElementFirstElement);
                }

            }

    },


    displaySolution: function () {

        console.log('displaySolution');

        let clonedTemplateFragment = document.getElementById('empty-mastermind').content.cloneNode(true);

        let mastermind = clonedTemplateFragment.querySelector('.mastermind__template');

        let userPossibilities = mastermind.querySelector('.mastermind__center');

            for (let j = 0; j < app.solution.length; j += 1) {
                console.log('displaySolution defaite', j);
                let createUserPossibilities = document.createElement("span");
                    createUserPossibilities.setAttribute('class', 'circle circle__game circle__game--' + app.solution[j]);
                    createUserPossibilities.dataset.color = app.solution[j];

                userPossibilities.appendChild(createUserPossibilities);
                //document.querySelector('.mastermind__userPlay').appendChild(userPossibilities);
            }

        let userAnwsers = mastermind.querySelector('.mastermind__right');
        userAnwsers.textContent = ''; 

                const parentElement = document.querySelector('.header__bot');
                parentElement.textContent = ''; 
                parentElement.appendChild(mastermind);
            // const referenceNode = document.querySelector('.mastermind__template');
    }

}

document.addEventListener('DOMContentLoaded', app.init);