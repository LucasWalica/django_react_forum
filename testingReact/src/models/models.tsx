export class Post{
    id:number;
    creatorName:string;
    title:string;
    topic_1:string;
    topic_2:string;
    desc:string;
    stars:number;

    constructor(id:number, creatorName:string, title:string, topic_1:string, topic_2:string, desc:string, stars:number){
        this.id =id;
        this.creatorName = creatorName;
        this.title = title; 
        this.topic_1 = topic_1;
        this.topic_2 = topic_2;
        this.desc = desc;
        this.stars = stars;
    }
}   

export class Comment{
    id:number;
    creatorName:string;
    postFk:number;
    text:string;
    stars:number;

    constructor(id:number, creatorName:string, postFk:number, text:string, stars:number){
        this.id=id; 
        this.creatorName = creatorName;
        this.postFk= postFk;
        this.text=text;
        this.stars=stars;
    }
}