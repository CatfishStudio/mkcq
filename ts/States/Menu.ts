module MortalKombatCards {
    export class Menu extends Phaser.State{
        public static Name: string = "menu";
        public name: string = Menu.Name;
        private videoSprite:Phaser.Sprite;
        private menuSprite:Phaser.Sprite;
        private groupMenu: Phaser.Group;
        private groupButtons: Phaser.Group;
        private groupSettings: Phaser.Group;
        private tween:Phaser.Tween;
        
        constructor() {
            super();
        }
        
        public create() {
            this.groupMenu = new Phaser.Group(this.game, this.stage);
            
            this.menuSprite = new Phaser.Sprite(this.game, -5,-5, Images.MenuImage)
            this.menuSprite.scale.set(1.025);
            this.groupMenu.addChild(this.menuSprite);
            
            this.tween = this.game.add.tween(this.menuSprite);
            this.tween.to({ x: -200, y: -5 }, 20000, 'Linear');
            this.tween.to({ x: 0, y: 0}, 20000, 'Linear');
            this.tween.onComplete.add(this.onTweenComplete, this);

            this.videoSprite = new Phaser.Sprite(this.game,0,0,Atlases.Video1,0);
            this.videoSprite.scale.set(2.6, 2.6);
            this.groupMenu.addChild(this.videoSprite);

            let anim: Phaser.Animation = this.videoSprite.animations.add(Atlases.Video1);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(15, false, true);

            this.groupMenu.addChild(new Phaser.Sprite(this.game, 0, 0, Images.BackgroundImage));
        }

        public shutdown(){
            this.groupMenu.removeChildren();
        }

        private onCompleteVideo():void {
            this.groupButtons = new Phaser.Group(this.game, this.stage);
            this.groupButtons.x = -500;
            this.groupButtons.y = 0;

            this.groupButtons.addChild(new Phaser.Sprite(this.game, 25, 125, Images.LogoImage));
            
            let buttonStart = new Phaser.Button(this.game, 75, 400, Sheet.ButtonStartNewGame, this.onButtonClick, this, 1, 2);
            buttonStart.name = 'start';
            this.groupButtons.addChild(buttonStart);
            
            let buttonSettings = new Phaser.Button(this.game, 75, 475, Sheet.ButtonSettings, this.onButtonClick, this, 1, 2, 2, 2);
            buttonSettings.name = 'settings';
            this.groupButtons.addChild(buttonSettings);
            
            let buttonInvite = new Phaser.Button(this.game, 75, 550, Sheet.ButtonInvite, this.onButtonClick, this, 1, 2, 2, 2);
            buttonInvite.name = 'invite';
            this.groupButtons.addChild(buttonInvite);
            
            let tweenButtons: Phaser.Tween = this.game.add.tween(this.groupButtons);
            tweenButtons.to({ x: 0, y: 0}, 500, 'Linear');
            tweenButtons.onComplete.add(() => {
                this.tween.start();
            }, this);
            tweenButtons.start();
        }

        private onTweenComplete(event:any):void {
            this.tween.start();
        }

        
        private onButtonClick(event) {
            switch (event.name) {
                case 'start':
                    {
                        console.log("START");
                        //this.game.state.start(Drivers.Name, true, false);
                        break;
                    }
                case 'continue':
                    {
                        
                        break;
                    }
                case 'settings':
                    {
                        this.settingsCreate();
                        break;
                    }
                case 'close':
                    {
                        this.settingsClose();
                        break;
                    }
                case 'invite':
                    {
                        
                        break;
                    }                
                default:
                    break;
            }
        }
        
        private settingsCreate() {
            this.groupSettings = new Phaser.Group(this.game, this.groupMenu);
            
            let graphicOverlay: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            graphicOverlay.beginFill(0xFFFFFF, 0.5);
            graphicOverlay.drawRect(0, 0, this.game.width, this.game.height);
            graphicOverlay.endFill();
            
            graphicOverlay.beginFill(0x0000AA, 0.8);
            graphicOverlay.drawRect((this.game.width / 2) - 150, (this.game.height / 2) - 150, 300, 150);
            graphicOverlay.endFill();
            
            graphicOverlay.inputEnabled = true;
            
            this.groupSettings.addChild(graphicOverlay);
            
            let buttonClose = new Phaser.Button(this.game, 50, 50, Sheet.ButtonBlueClose, this.onButtonClick, this, 1, 2);
            buttonClose.name = 'close';
            this.groupSettings.addChild(buttonClose);
        }
        
        private settingsClose() {
            this.groupSettings.removeChildren();
            this.groupMenu.removeChild(this.groupSettings);
        }
    }
}