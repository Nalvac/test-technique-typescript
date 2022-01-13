import { ResultService } from './result.service';
import { ResultModel } from './model/result.model';

describe('ResultService', () => {
  let resultService: ResultService;

  it('should be created', () => {
    resultService = new ResultService();
    expect(resultService).toBeTruthy();
  });


  /* step 1 : initialisation du projet avec 0 et 1 resultat */
  it('devrait être initialisé avec une liste de résultat vide', () => {
      expect(resultService.getAllResult()).toEqual([]);
  });

  describe("aprés l'ajout d'un résultat,", () => {
    beforeEach(() => {
      const result: ResultModel = {id: 46,idOwner:76,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test"};
      resultService = new ResultService();
      resultService.addResult(result);
    });

    it('devrait avoir une liste de 1 résultat non vue', () => {
      expect(resultService.getAllResult().length).toEqual(1);
    });

    it('devrait avoir une liste de 1 résultat vue aprés la vision de ce résultat', () => {
      resultService.seenResult(46);
      expect(resultService.getAllResultSeen().length).toEqual(1);
      /* A cet instant du test dans getAllResult nous avons 1 élément donc l'index sera 0*/
      expect(resultService.getAllResult()[0].isSeen).toEqual(true);
    });
  });

  /* step 2 : 3 resultats */
  describe("aprés l'ajout de 3 resultats,", () => {
    beforeEach(() => {
      // init le service avec 3 resultats
      const result1: ResultModel = {id: 46,idOwner:76,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test1"};
      const result2: ResultModel = {id: 4,idOwner:76,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test2"};      
      const result3: ResultModel = {id: 6,idOwner:76,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test3"};
      resultService = new ResultService();
      resultService.addResult(result1);
      resultService.addResult(result2);
      resultService.addResult(result3);
    });

    it("devrait avoir une liste de 3 resultats non vue aprés l\'ajout de 3 resultat.", () => {
      //expect(false).toEqual(true);
      // getAllResult doit avoir trois élements
      expect(resultService.getAllResult().length).toEqual(3);
      // 3 resultats non vue-vérification     
      for(let i in resultService.getAllResult() ){
        expect(resultService.getAllResult()[i].isSeen).toEqual(false);
      }
    });

    it("ne devrait pas authorisé l'ajout d'un résultats avec un id existent", () => {
      //expect(false).toEqual(true);
      expect(resultService.getAllResult().length).toEqual(3);
    });

    it("devrait avoir 1 resultats vue dans la liste aprés la vision d\'un resultat", () => {
      //expect(false).toEqual(true);
      let seen : boolean=false;
      resultService.seenResult(6);      
      resultService.seenResult(4);           
      resultService.seenResult(46);
      for(let i in resultService.getAllResult()) {
        if(resultService.getAllResult()[i].isSeen){
          expect(true).toEqual(true);
          seen = true;
          return
        }
      }
      if(seen == false){
        expect(false).toEqual(true);
      } 
    });

    it("devrait avoir les 3 resultats vue dans la liste aprés qu\'il soit tous vue", () => {
     
      resultService.seenResult(6);
      resultService.seenResult(46);
      resultService.seenResult(4);      
      expect(resultService.getAllResultSeen().length).toEqual(3);
    });

    it("devrait avoir plus que 2 resultats vue dans la liste aprés qu\'il soit tous vue puis 1 ou la vue est enlevé", () => {
      //expect(false).toEqual(true);
      resultService.seenResult(6);
      resultService.seenResult(46);
      resultService.seenResult(4);
      resultService.unseenResult(46);
      expect(resultService.getAllResultSeen().length).toEqual(2);
    });

    it("ne devrait pas planté aprés la vision d\'un resultat non ajouté", () => {
      try{
        expect(resultService.seenResult(25)).toEqual(true);
      }catch (error) {
        console.log(error);
      }
    });
  });


  /* step 3 (evenement) */
  describe(",aprés l\'ajout de 3 resultats,", () => {

    beforeEach(() => {
      // init le service avec 3 resultats (doit etre identique que le step 2)
      const result1: ResultModel = {id: 46,idOwner:76,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test1"};
      const result2: ResultModel = {id: 4,idOwner:7,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test2"};      
      const result3: ResultModel = {id: 6,idOwner:6,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test3"};
      resultService = new ResultService();
      resultService.addResult(result1);
      resultService.addResult(result2);
      resultService.addResult(result3);
    });

    //ps : je ne veux pas que les event de création soi initialisé dans le beforeEach ci dessus mais directement dans le resultService
    it("devrait avoir la list des résultat dans l\'order de création ( en se basant sur les events de création)", () => {
      let results = resultService.getAllResult();
      for (let i = 0; i < results[i].eventResults.length - 1; i++) {
        if (results[i].eventResults[0].createdAt.getSeconds() < results[i+1].eventResults[0].createdAt.getSeconds()) {
          expect(true).toEqual(true);
        }else{
          expect(false).toEqual(true);
        }
       }
    });

    it("devrait avoir 1 event a la date de maintenant quand 1 résultat est vue", () => {
      expect(false).toEqual(true);
    });

    it("devrait avoir 2 events avec 2 dates différent aprés la vision d\'un resultat puis la suppression de la vision", () => {
      expect(false).toEqual(true);
    });

    it("devrait avoir une fonction qui retourne une liste ordonnée des resultats par rapport au dernier modifier", () => {
      expect(false).toEqual(true);
    });
  });

  /* proposé de nouveau test */

});
