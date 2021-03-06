module MortalKombatCards{
        export class Game extends Phaser.Game {
                private static instance: Game = null;
                
                constructor() {
                        super({
                                enableDebug: false,             //No debug
                                width: Constants.GAME_WIDTH,    //Configured width
                                height: Constants.GAME_HEIGHT,  //Configured height
                                renderer: Phaser.AUTO,          //We prefer WebGL over canvas rendering, but we fall back to canvas because we like to support IE
                                parent: 'content',              //The div in the html we want to put the game in, this helps with styling
                                transparent: true,              //The game should be transparent
                                antialias: true                 //ofcourse this is true
                        });
                        
                        this.state.add(Boot.Name, Boot, false);
                        this.state.add(Preloader.Name, Preloader, false);
                        this.state.add(Menu.Name, Menu, false);
                        this.state.add(Store.Name, Store, false);
                }
                
                public static getInstance(): Game {
                        if(MortalKombatCards.Game.instance === null) {
                                Game.instance = new Game();
                        }
                        return Game.instance;
                }
                
                public start(): void {
                        this.state.start(Boot.Name);
                }
                
        }
}