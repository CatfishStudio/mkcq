class Atlases { 
    public static LogoAtlas: string = 'logo_atlas';
    public static Video1: string = 'video1';
    public static Video2: string = 'video2';
    public static Video3: string = 'video3';
    public static VideoHelp: string = 'video_help';
    public static FightersCards: string = 'fighters_cards';
    public static HitsCards: string = 'hits_cards';
    public static Characteristics: string = 'characteristics';
    
    public static preloadList:Array<string> = [
        Atlases.Video1,
        Atlases.Video2,
        Atlases.Video3,
        Atlases.VideoHelp,
        Atlases.FightersCards,
        Atlases.HitsCards,
        Atlases.Characteristics
    ];
}