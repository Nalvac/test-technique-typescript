import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';

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
    if(this.newResults.some(el=>el.id == newResult.id)){
      console.log("Existe déjà");
    }
    else{
    this.newResults.push(newResult);
    console.log(JSON.stringify(this.newResults) );
    }
  }

  public seenResult(idResult:number) {
    let  result  = this.newResults.find((el)=>el.id==idResult);
    if (result != undefined){
      result.isSeen = true;
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
      this.resultUnSeen.push(result);
     const indexElemt= this.resultIsSeen.findIndex((el)=>el.id == idResult);
     if(indexElemt > -1){
      this.resultIsSeen.splice(indexElemt,1); 
    }
    }
  }

  public getAllResult() : Array<ResultModel> {
    
    return this.newResults.concat(this.resultIsSeen) ;
  }

  public getAllResultSeen() : Array<ResultModel> {
    
    return this.resultIsSeen;
  }

  public getAllResultUnSeen() : Array<ResultModel> {
    return [];
  }

  public numberOfEventSeen() : number
  {
    return 0;
  }
}
