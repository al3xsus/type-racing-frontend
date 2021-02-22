import React, {Component} from "react";
import {fetchData} from "../utils/AuxFns";
import {Container, Typography} from "@material-ui/core";
import {getTexts, globalState, TextData, userResults} from "../redux";
import {connect} from "react-redux";
import UnderConstructionImg from "../assets/under-construction.svg"

interface Props {
    texts: TextData[],
    loading: boolean,
    getTexts: () => void,
}

interface State {
    allResStats: userResults[]
}

class Scores extends Component<Props, State> {
    state: State = {
        allResStats: []
    }

    componentDidMount = async () => {
        try {
            const response = await fetchData('GET', 'results')
            this.setState({
                allResStats: response
            })
        } catch (e) {
            console.log(e)
        } finally {
            await this.props.getTexts()
        }
    }

    render() {
        console.log(this.state)
        const sorted = this.state.allResStats.sort((a, b) => a.time - b.time)
        return (
            <Container>
                <div style={{
                    width: "100%",
                    textAlign: "center"
                }}>
                    <Typography variant="h3" gutterBottom>
                        Hall of Fame
                    </Typography>
                    <img width={"50%"} height={"50%"} src={UnderConstructionImg} alt={"under-construction"}/>
                    <Typography variant="subtitle2" gutterBottom>
                        Under construction...
                    </Typography>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: globalState) => ({
    texts: state.texts,
    loading: state.loading,
});
const mapDispatchToProps = {getTexts};

const ScoresContainer = connect(mapStateToProps, mapDispatchToProps)(Scores);

export default ScoresContainer
