import React, { Component } from 'react';
import Question from '../../components/Question';
import Answers from '../../components/Answers';
import Results from '../../components/Results';

class Game extends Component {
    state = {
        question: {},
        answered: false,
        submittedAnswer: '',
        answers: [],
        chosenAnswer: ''
    }
    componentWillMount = () => {
        this.setState({question: this.props.question, answers: [this.props.question.results[0].correct_answer, ...this.props.question.results[0].incorrect_answers]});
    }
    submitHandler = (e) => {
        e.preventDefault();
        const randomAnswers = [this.state.submittedAnswer, ...this.state.answers];
        this.shuffleArray(randomAnswers);
        this.setState({answered: true, answers: randomAnswers});
    }
    changeHandler = (e) => {
        this.setState({submittedAnswer: e.target.value})
    }
    clickedAnswerHandler = (e) => {
        console.log(e.target.value);
        this.setState({chosenAnswer: e.target.value});
    }
    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    render() {
        return (
            <>
                {this.state.question.response_code === 0 ?
                    <>
                    <Question question={this.state.question.results[0].question}/>
                    {!this.state.answered ? 
                        <form onSubmit={this.submitHandler}>
                            <input type={"text"} onChange={this.changeHandler}/>
                            <input type={"submit"} placeholder={"Submit"} />
                        </form>
                    : !this.state.chosenAnswer ? 
                        <Answers 
                        answers={this.state.answers}
                        onSubmit={this.clickedAnswerHandler}
                        /> : <Results correct={this.state.question.results[0].correct_answer} />
                        }
                    </>
                : null }
            </>
        )
    }
}

export default Game;