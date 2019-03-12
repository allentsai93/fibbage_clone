import React, { useState, useEffect } from 'react';
import Question from '../../components/Question';
import Answers from '../../components/Answers';
import Results from '../../components/Results';

function Game(props) {
    const [question, setQuestion] = useState({});
    const [answered, setAnswered] = useState(false);
    const [submittedAnswer, setSubmittedAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [chosenAnswer, setChosenAnswer] = useState("");
    const [autopickedAnswer, setAutopickedAnswer] = useState("");

    useEffect(() => {
            setQuestion(props.question);
            setAnswers([props.question.results[0].correct_answer, ...props.question.results[0].incorrect_answers])
    }, []);

    function submitHandler() {
        const randomAnswers = [submittedAnswer || autopickedAnswer, ...answers];
        shuffleArray(randomAnswers);
        setAnswered(true);
        setAnswers(randomAnswers);
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return (
        <>
            {question.response_code === 0 ?
                <>
                <Question question={question.results[0].question}/>
                {!answered ? 
                    <form>
                        <input type="text" onChange={(e) => { setSubmittedAnswer(e.target.value) }} placeholder={autopickedAnswer !== '' ? autopickedAnswer : ''}/>
                        <span onClick={() => { submitHandler() }}>Submit</span>
                        <span onClick={() => { setAutopickedAnswer(answers[2]) }}>Lie For Me</span>
                    </form>
                : !chosenAnswer ? 
                    <Answers 
                    answers={answers}
                    onSubmit={(e) => setChosenAnswer(e)}
                    /> : <Results correct={question.results[0].correct_answer} />
                    }
                </>
            : null }
        </>
    )
}

export default Game;