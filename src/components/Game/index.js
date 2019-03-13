import React, { useState, useEffect } from 'react';
import Question from '../../components/Question';
import Answers from '../../components/Answers';
import Results from '../../components/Results';
import { withFirebase } from '../../firebase';

function Game(props) {
    const [question, setQuestion] = useState({});
    const [fakeAnswerSubmitted, setFakeAnswer] = useState(false);
    const [submittedAnswer, setSubmittedAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [chosenAnswer, setChosenAnswer] = useState("");
    const [autopickedAnswer, setAutopickedAnswer] = useState("");
    const [players, setData] = useState([]);
    // const [playersAnswers, setPlayersAnswers] = useState([]);

    const gameId = props.gameId;
    const user   = props.user;
    let userData = {};
    let usersFakeAnswers = [];


    useEffect(() => {
        setQuestion(props.question);
        setAnswers([props.question.results[0].correct_answer, ...props.question.results[0].incorrect_answers])
    }, []);

    function answerSubmitHandler(e){
        setChosenAnswer(e);
    }

    function fetchPlayersAnswers(){
        props.firebase.database().ref('games/' + gameId + '/players').once('value')
          .then((snapshot) => {
              userData = (snapshot.val());
          })
          .then(()=> {
            for(let user in userData){
                usersFakeAnswers.push(userData[user].fakeAnswer);
            }
          })
          .then(()=> {
            createAnswers();
          })
    }

    function createAnswers(){
        let randomAnswers = [...usersFakeAnswers, ...answers];
        shuffleArray(randomAnswers);
        setFakeAnswer(true);
        setAnswers(randomAnswers);
    }

    function submitHandler() {
        let answer = submittedAnswer || autopickedAnswer;
        props.firebase.database().ref('games/' + gameId + '/players/' + user).update({
            fakeAnswer: answer
        })
        fetchPlayersAnswers();
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
                <Question question={question.results[0].question} gameId={props.gameId} user={props.user}/>
                {!fakeAnswerSubmitted ? 
                    <form>
                        <input type="text" onChange={(e) => { setSubmittedAnswer(e.target.value) }} placeholder={autopickedAnswer !== '' ? autopickedAnswer : ''}/>
                        <span onClick={() => { submitHandler() }}>Submit</span>
                        <span onClick={() => { setAutopickedAnswer(answers[2]) }}>Lie For Me</span>
                    </form>
                : !chosenAnswer ? 
                    <Answers 
                    answers={answers}
                    onSubmit={(e) => answerSubmitHandler(e)}
                    /> : <Results correct={question.results[0].correct_answer} />
                    }
                </>
            : null }
        </>
    )
}

export default withFirebase(Game);