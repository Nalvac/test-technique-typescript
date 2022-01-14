import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';

enum Events {
  Created = 'created',
  Seen = 'seen',
  Received = 'received',
}
export class ResultService {
  public result : ResultModel = {
    id : 0,
    idOwner :0,
    idRecipients:[],
    isSeen:false,
    eventResults: [],
    contentOfResult:"",
    
  };
  
  public newResults  : ResultModel [] ;
  public resultIsSeen  : ResultModel [] ;  
  public resultUnSeen  : ResultModel [] ;
   
  constructor() { 
    this.newResults= [];
    this.resultIsSeen = [];
    this.resultUnSeen = [];

  }
  

  public addResult(newResult:ResultModel) {  
    if (this.newResults.some(el=>el.id == newResult.id)){
      console.log("Existe déjà");
    }
    else{
       let event = {
        id: Events.Created,
        idOwner: newResult.idOwner,
        createdAt:new Date()
      }
      newResult.eventResults.push(event);
      this.newResults.push(newResult);
    }
  }

  public seenResult(idResult:number) {
    let  result  = this.newResults.find((el)=>el.id==idResult);
    if (result != undefined){
      result.isSeen = true;
      result.eventResults[0].createdAt = new Date();
      this.resultIsSeen.push(result);
      const indexElemt= this.newResults.findIndex((el)=>el.id == idResult);
      if(indexElemt > -1){
        this.newResults.splice(indexElemt,1); 
      }
      return true;
    } else {
      return false;
    }

  }

  public unseenResult(idResult:number) {
    let  result  = this.resultIsSeen.find((el)=>el.id==idResult);
    if (result != undefined){
      result.isSeen = false;
      let event = {
        id: Events.Seen,
        idOwner: result.idOwner,
        createdAt:new Date()
      }
      result.eventResults.push(event);
      this.resultUnSeen.push(result);
     const indexElemt= this.resultIsSeen.findIndex((el)=>el.id == idResult);
     if(indexElemt > -1){
      this.resultIsSeen.splice(indexElemt,1); 
    }
    }
  }

  public getAllResult() : Array<ResultModel> {
    
      
    console.log(JSON.stringify(this.newResults.concat(this.resultIsSeen).concat(this.resultUnSeen)) );
    return this.newResults.concat(this.resultIsSeen).concat(this.resultUnSeen) ;
  }

  public getAllResultSeen() : Array<ResultModel> {
    
    return this.resultIsSeen;
  }

  public getAllResultUnSeen() : Array<ResultModel> {
    console.log(this.resultUnSeen);
    return this.resultUnSeen;
  }

  public numberOfEventSeen() : number
  {
    return 0;
  }
  public dernierModif():Array<ResultModel>{

    
    return this.getAllResult().reverse();
  }
}
