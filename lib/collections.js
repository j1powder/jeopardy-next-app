import { projectFirestore } from "@/firebaseConfig";
import {collection, getDocs} from 'firebase/firestore';

export const getQuestions = async () => {
    let results = [];
    try {
        const snapshot = await getDocs(collection(projectFirestore,'jeopardy-questions')); 
        const data = snapshot.docs.forEach(doc=>{
          results.push({...doc.data(), id: doc.id})
        });
        //console.log(results)
        return results;
      } catch (error) {
        throw new Error(error.message);
      }
}