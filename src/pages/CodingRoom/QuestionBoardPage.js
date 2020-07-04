import React, {Component} from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import SearchBox from '../../components/SearchBox/SearchBox';
import QuestionList from '../../components/QuestionList/QuestionList';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './CodingRoom.css';


class QuestionBoardPage extends Component {
    SORT_TYPE = [{name: 'CATEGORY', id: 0},
                 {name: 'DIFFICULTY', id: 1},
                 {name: 'ALL', id: 2},
                ];

    DIFFICULTY_LEVEL = [{level: 'Easy', value: 25},
                        {level: 'Intermediate', value: 50},
                        {level: 'Hard', value: 75},
                        {level: 'Professional', value: Infinity},
                       ];

    constructor(props) {
        super(props);
        this.state = {
            sort: this.SORT_TYPE[0],
            questionList: [],
            searchString: '',
        }
    }

    componentDidMount() {
        this.setState({questionList: this.getQuestionList()});
    }

    getQuestionList() {
        // make an API call to get list of questions available
        // Assumption: API call -> json file and contains title, url, level, category, tags
        // Design: insert category at top of tags when passing to question card
        return [
            <QuestionCard key={0} title="Longest Substring Sequence"
                          url="dummy.com"
                          level={10}
                          tags={["Linked List"]}
                          />,
            <QuestionCard key={1} title="Hello World" level={10} url="dummy.com" tags={["String"]} />,
            <QuestionCard key={4} title="Reverse Single Linked List" level={40} url="dummy.com" tags={["Linked List"]}/>,
            <QuestionCard key={8} title="Construction Of BST" level={80} url="dummy.com" tags={["Tree"]}/>,
            <QuestionCard key={7} title="Hello World" level={70} url="dummy.com" tags={["String"]}/>,
            <QuestionCard key={3} title="Water Area" level={30} url="dummy.com" tags={["Array"]}/>,
            <QuestionCard key={2} title="Pair Sum" level={20} url="dummy.com" tags={["Array"]}/>,
            <QuestionCard key={6} title="Fibonacci" level={60} url="dummy.com" tags={["Dynamic Programming"]}/>,
            <QuestionCard key={10} title="xxxxx Algorithm" level={90} url="dummy.com" />,
            <QuestionCard key={9} title="ooooo Algorithm" level={90} url="dummy.com" />,
            <QuestionCard key={12} title="Topological Sorting" level={50} url="dummy.com" tags={["Graph"]}/>,
            <QuestionCard key={5} title="Quick Sort" level={60} url="dummy.com" tags={["Sort"]}/>,
        ];
    }

    sortQuestions(questions) {
        switch(this.state.sort.id) {
        case 0:
            return this.categoricalSort(questions);
        case 1:
            return this.levelSort(questions);
        case 2:
            return this.randomSort(questions);
        default:
            break
        }
    }

    categoricalSort(questions) {
        const categories = new Map();
        const misc = []; // leave misc category to push it at the end after sorting categories.
        for(let idx=0; idx < questions.length; idx++) {
            let question = questions[idx];
            if(!question.props.tags || question.props.tags[0] === 'Misc') {
                misc.push(question);
                continue;
            }
            let key = question.props.tags[0];
            if(categories.has(key)) {
                categories.get(key).push(question);
            } else {
                categories.set(key, [question]);
            }
        }
        let sortedQuestionList = []
        let compareInteger = (a, b) => (a.props.level >= b.props.level);
        categories.forEach((value, key) => {
            sortedQuestionList.push(
                <QuestionList type='vertical'
                              key={key}
                              title={key}
                              questions={value.sort(compareInteger)}
                />
            )
        })
        sortedQuestionList.sort((a, b) => (a.props.title >= b.props.title))
        if(misc.length > 0) {
            sortedQuestionList.push(
                <QuestionList type='vertical' key='Misc' title='Misc' questions={misc.sort(compareInteger)}/>
            )
        }
        return (
            <div className='questionboard-vertical'>
                {sortedQuestionList}
            </div>
        );
    }

    levelSort(questions) {
        let questionsByLevel = Array.from(this.DIFFICULTY_LEVEL, each => ({level: each.level, value: each.value, list: []}));
        for(let idx=0; idx < questions.length; idx++) {
            let question = questions[idx];
            for(let jdx=0; jdx < questionsByLevel.length; jdx ++) {
                let eachLevel = questionsByLevel[jdx];
                if(question.props.level < eachLevel.value) {
                    eachLevel.list.push(question);
                    break
                }
            }
        }
        return (
            <div className='questionboard-horizontal'>
                {
                    questionsByLevel.filter(each => each.list.length > 0).map((each, idx) => {
                        return <QuestionList type='horizontal' id={each.level} title={each.level} questions={each.list.sort((a, b) => (a.props.level >= b.props.level))} />
                    })
                }
            </div>
        )
    }

    randomSort(questions) {
        return (
            <div className='questionboard-horizontal'>
                <QuestionList  type='horizontal' key={'All'} title='All' questions={questions} />
            </div>
        )
    }

    render() {
        return (
            <div className='page-normal'>
                <NavBar />
                <div className='page-normal-main'>
                    <div className='questionboard-header'>
                        <h2 className='questionboard-title'>Question Board</h2>
                        <SearchBox className='questionboard-searchbox' placeholder='Search Question'
                                   onChange={e => this.setState({searchString: e.target.value})} />
                        <div className='questionboard-sortpanel'>
                            {
                                this.SORT_TYPE.map((each) => (
                                    <ToggleButton
                                        className='m-1 p-2 text-center'
                                        key={each.id}
                                        type='radio'
                                        variant='secondary'
                                        checked={each === this.state.sort}
                                        onChange={() => this.setState({sort: this.SORT_TYPE[each.id]})}
                                    >
                                        {each.name}
                                    </ToggleButton>
                                ))
                            }
                        </div>
                    </div>
                    {this.sortQuestions(this.state.questionList.filter(each =>
                        (each.props.title.toLowerCase().includes(this.state.searchString.toLowerCase()))))}
                </div>
                <Footer />

            </div>
        )
    }
}

export default QuestionBoardPage;