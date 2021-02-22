import React, {Component} from "react";
import {Container} from "@material-ui/core";
import CustomLoader from "../components/CustomLoader";
import TextCardsGrid from "../components/TextCardsGrid";
import {FinalStats, getResults, getTexts, globalState, raceResults, setLoadingStatus, TextData} from "../redux";
import {connect} from "react-redux";
import TypingPanel from "../components/TypingPanel";
import {fetchData} from "../utils/AuxFns";
import ResultPanel from "../components/ResultPanel";

interface Props {
    texts: TextData[],
    loading: boolean,
    getTexts: () => void,
    getResults: () => void,
    selectedText: TextData | null
    selectedResult: raceResults | null,
    results: raceResults[]
}

interface State {
}

class User extends Component<Props, State> {
    state: State = {}

    componentDidMount = async () => {
        await this.props.getTexts()
        await this.props.getResults()
    }

    saveResult = async (body: FinalStats) => {
        try {
            setLoadingStatus(true)
            await fetchData('post', 'results', body)
        } catch (error) {
            console.log(error)
        } finally {
            await this.props.getResults()
            setLoadingStatus(false)
        }
    }

    render() {
        const {texts, loading, selectedText, selectedResult} = this.props
        if (loading) {
            return <Container>
                <CustomLoader/>
            </Container>
        }
        if (selectedText) {
            return <Container>
                <TypingPanel data={selectedText} saveResult={this.saveResult}/>
            </Container>
        }
        if (selectedResult) {
            return <Container>
                <ResultPanel raceData={selectedResult}/>
            </Container>
        }
        if (texts.length > 0) {
            return <Container>
                <TextCardsGrid texts={texts}/>
            </Container>
        }
        return <Container>no data</Container>
        // if (results.length) {
        //     console.log(results)
        //     return <ResultPanel raceData={results[0]}/>
        // }
    }
}

const mapStateToProps = (state: globalState) => ({
    texts: state.texts,
    results: state.results,
    loading: state.loading,
    selectedText: state.selectedText,
    selectedResult: state.selectedResult
});
const mapDispatchToProps = {getTexts, getResults};
const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;