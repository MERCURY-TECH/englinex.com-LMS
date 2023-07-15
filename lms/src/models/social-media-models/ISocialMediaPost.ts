/**
* @description Social Media post interface
* @version 1.0
* @since 2023, 07, Wednesday, 12,15, 58, 39 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

export interface ISocialMediaPost {
    UserID ?:string,
    tagList ? :Array<string>,
    isPublic ?: boolean,
    content : {
        imageUrls?:Array<string>,
        articleText:string
    }
}