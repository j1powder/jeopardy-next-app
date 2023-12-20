import { getQuestions } from "@/lib/collections";
import HomePage from "@/components/HomePage";

const GameboardPage = async () => {

const questions = await getQuestions();

console.log(questions)

    
  return <div>
            <HomePage questions={questions}/>
        </div>

  
}

export default GameboardPage;