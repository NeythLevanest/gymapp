export class UserBasicInfo{  //lenderprospect
    constructor(
        
        public username: String,
        public first_name: String,
        public last_name: String,
        public email?:String,
        public id?: String,
    ){
      
    }

}

export class User{
    constructor(
        public email:String,
        public first_name: String,
        public last_name: String,
        public password:   String,
        public id?: string,
    ){
      
    }
}