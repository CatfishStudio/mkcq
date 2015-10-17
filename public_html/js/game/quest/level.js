var levelStage;					// главный stage
var levelWindowStage;			// stage окна
var levelAnimationLeftFighter;	// Анимация левого бойца (пользователь)
var levelAnimationRightFighter;	// Анимация правого бойца (ИИ)

var levelAIName = null;
var	levelAIHit1 = 0;
var	levelAIHit1 = 0;
var	levelAIHit1 = 0;
var	levelAIHit1 = 0;
var	levelAIHit1 = 0;
var	levelAILife = 0;

var levelStyleText = {
    font : 'bold 13px Arial',
    fill : '#FFFFFF'
};

/* Главная функция */
function levelShow()
{
	levelStage = new PIXI.Container();
	levelWindowStage = new PIXI.Container();

	levelInitFighters();

	levelBackground();
	qlifebarShow(levelWindowStage, 0, 0);
	createLevelAnimationFighters();
	levelBorder();
	createLevelField();
	createLevelButton();
	qtimerShow(levelWindowStage, (MAIN_WIDTH / 2 - 25), 65, 0x000000, 0x000000, 0xFFFFFF);

	levelMask();

	levelStage.addChild(levelWindowStage);
	stage.addChild(levelStage);
	console.log("Create window: level");
}

/* Инициализация характеристик бойцов */
function levelInitFighters()
{
	levelAIName = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_name;
	levelAIHit1 = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_hit_1;
	levelAIHit2 = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_hit_2;
	levelAIHit3 = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_hit_3;
	levelAIHit4 = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_hit_4;
	levelAIHit5 = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_hit_5;
	levelAILife = qGlobalEnemiesAI[qGlobalTournamentProgress].ai_life;
}

/* Наложение маски */
function levelMask()
{
	var posX = (MAIN_WIDTH - 800) / 2;
	var posY = (MAIN_HEIGH - 600) / 2.5;
	var thing = new PIXI.Graphics();
	//stage.addChild(thing);
	thing.position.x = 0;
	thing.position.y = 0;
	thing.lineStyle(0);
	thing.clear();
    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(posX, posY);
    thing.lineTo(posX, posY);
    thing.lineTo(posX + 800, posY);
    thing.lineTo(posX + 800, posY + 600);
    thing.lineTo(posX, posY + 600);
        
	levelWindowStage.mask = thing;
}

/* Наложение фоновой картинки и рамки */
function levelBackground()
{
	var background = new PIXI.Sprite(qGlobalLevels[qGlobalTournamentProgress - 1].backgroundTexture);
	background.name = "stairsBackground";
	background.position.x = (MAIN_WIDTH - 800) / 2;
	background.position.y = (MAIN_HEIGH - 600) / 2.5;
	background.scale.x += 1.0;
	background.scale.y += 1.35;
	levelWindowStage.addChild(background);
}

function levelBorder()
{
	var border = new PIXI.Sprite(borderTexture);
	border.name = "stairsBorder";
	border.position.x = (MAIN_WIDTH - 800) / 2;
	border.position.y = (MAIN_HEIGH - 600) / 2.5;
	levelWindowStage.addChild(border);
}

/* Создание анимации бойцов */
function createLevelAnimationFighters()
{
	levelAnimationLeftFighter = new PIXI.extras.MovieClip(animFightersTextures[qGlobalUserFighterName + ":STANCE:LEFT_TO_RIGHT"]);
	levelAnimationLeftFighter.position.x = 50;
	levelAnimationLeftFighter.position.y = 425;
	levelAnimationLeftFighter.scale.x += 0.5;
	levelAnimationLeftFighter.scale.y += 0.5;
	levelAnimationLeftFighter.play();
	levelAnimationLeftFighter.animationSpeed = 0.2;
	levelWindowStage.addChild(levelAnimationLeftFighter);

	levelAnimationRightFighter = new PIXI.extras.MovieClip(animFightersTextures[levelAIName + ":STANCE:RIGHT_TO_LEFT"]);
	levelAnimationRightFighter.position.x = 700;
	levelAnimationRightFighter.position.y = 425;
	levelAnimationRightFighter.scale.x += 0.5;
	levelAnimationRightFighter.scale.y += 0.5;
	levelAnimationRightFighter.play();
	levelAnimationRightFighter.animationSpeed = 0.2;
	levelWindowStage.addChild(levelAnimationRightFighter);

	console.log("level[animation]: " + qGlobalUserFighterName + " vs " + qGlobalEnemiesAI[qGlobalTournamentProgress].ai_name);
}

/* Создание игрового поля */
function createLevelField()
{
	createMatchField(qGlobalLevels[qGlobalTournamentProgress - 1].levelField);
	levelWindowStage.addChild(matchStage);
}

/* Создание основных кнопок окна */
function createLevelButton()
{
	var levelSpriteButton;
	var levelTextButton;
	var textLevelButtonsRus = ["Выйти в меню","Настройки","Пригласить","Закончить битву"];
	var textLevelButtonsEng = ["Exit in menu","Settings","Invite","End fight"];
	var levelStyleTextButton = {
    	font : 'bold 12px Arial',
    	fill : '#F7EDCA',
    	stroke : '#500000',
    	strokeThickness : 3,
    	wordWrap : true,
    	wordWrapWidth : 440
	};
	for(var i = 0; i < 4; i++)
	{
		if(language == "rus")
		{
			levelTextButton = new PIXI.Text(textLevelButtonsRus[i], levelStyleTextButton);
		}else{
			levelTextButton = new PIXI.Text(textLevelButtonsEng[i], levelStyleTextButton);
		}
		levelTextButton.x = (170 / 2) - (levelTextButton.width / 2);
		levelTextButton.y = 20;

		levelSpriteButton = new PIXI.Sprite(buttonTexture);
		levelSpriteButton.name = textLevelButtonsEng[i];
		levelSpriteButton.position.x = 35 + (200 * i);
		levelSpriteButton.position.y = 650;
		levelSpriteButton.interactive = true;
		levelSpriteButton.buttonMode = true;

		levelSpriteButton.tap = onLevelButtonClick;
		levelSpriteButton.click = onLevelButtonClick;
		levelSpriteButton.on('mousedown', onLevelButtonDown);
		levelSpriteButton.on('touchstart', onLevelButtonDown);
		levelSpriteButton.on('mouseup', onLevelButtonUp);
		levelSpriteButton.on('touchend', onLevelButtonUp);
		levelSpriteButton.on('mouseupoutside', onLevelButtonUp);
		levelSpriteButton.on('touchendoutside', onLevelButtonUp);
		
		levelSpriteButton.addChild(levelTextButton);
		levelStage.addChild(levelSpriteButton);
	}
}

/* События кнопок */
function onLevelButtonDown()
{
    this.isdown = true;
    this.scale.set(0.95);
    this.position.x += 5; 
}

function onLevelButtonUp()
{
	if(this.isdown)
	{
    	this.isdown = false;
    	this.scale.set(1.0);
    	this.position.x -= 5;
    }
}

function onLevelButtonClick() 
{
	if(this.name == "Settings")
	{
		matchUpdateField();
	}
}

/* Уменьшение значений LifeBars */
function levelReduceLifeBar(hitType, hitCount, hitModeAI) 
{
	var hitOne = (200 / qGlobalUserLife);
	var hitPlus = hitOne * (hitCount - 3);
	console.log("[LIFEBAR]: " + qGlobalUserFighterName);

	if(hitType == MATCH_HIT_1)
	{
		if(hitModeAI == false) qlifebarReduceRightBar((hitOne * DAMAGE_HIT_1) + hitPlus);
		else qlifebarReduceLeftBar((hitOne * DAMAGE_HIT_1) + hitPlus);
	}
	if(hitType == MATCH_HIT_2)
	{
		if(hitModeAI == false) qlifebarReduceRightBar((hitOne * DAMAGE_HIT_2) + hitPlus);
		else qlifebarReduceLeftBar((hitOne * DAMAGE_HIT_2) + hitPlus);
	}
	if(hitType == MATCH_HIT_3)
	{
		if(hitModeAI == false) qlifebarReduceRightBar((hitOne * DAMAGE_HIT_3) + hitPlus);
		else qlifebarReduceLeftBar((hitOne * DAMAGE_HIT_3) + hitPlus);
	}
	if(hitType == MATCH_HIT_4)
	{
		if(hitModeAI == false) qlifebarReduceRightBar((hitOne * DAMAGE_HIT_4) + hitPlus);
		else qlifebarReduceLeftBar((hitOne * DAMAGE_HIT_4) + hitPlus);
	}
	if(hitType == MATCH_HIT_5)
	{
		if(hitModeAI == false) qlifebarReduceRightBar((hitOne * DAMAGE_HIT_5) + hitPlus);
		else qlifebarReduceLeftBar((hitOne * DAMAGE_HIT_5) + hitPlus);
	}

	
}