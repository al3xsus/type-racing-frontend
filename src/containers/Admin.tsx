import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import BasicTable from "../components/TextsTable";
import CreateTextDialog from "../components/CreateTextDialog";
import CustomLoader from "../components/CustomLoader";
import {getTexts, globalState, setLoadingStatus, TextData} from "../redux";
import {connect} from "react-redux";
import {fetchData} from "../utils/AuxFns";

interface Props {
    texts: TextData[],
    loading: boolean,
    getTexts: () => void,
    setLoadingStatus: (status: boolean) => void
}

interface State {
}

class Admin extends Component<Props, State> {

    componentDidMount() {
        this.props.getTexts()
    }

    createText = async (body: object) => {
        try {
            setLoadingStatus(true)
            await fetchData('post', 'texts', body)
        } catch (error) {
            console.log(error)
        } finally {
            await this.props.getTexts()
            setLoadingStatus(false)
        }
    }

    deleteText = async (id: string) => {
        try {
            setLoadingStatus(true)
            await fetchData('delete', `texts/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            await this.props.getTexts()
            setLoadingStatus(false)
        }
    }

    updateText = async (id: string, body: object) => {
        try {
            setLoadingStatus(true)
            await fetchData('put', `texts/${id}`, body)
        } catch (error) {
            console.log(error)
        } finally {
            await this.props.getTexts()
            setLoadingStatus(false)
        }
    }

    render = () => {
        const {loading, texts} = this.props
        return <Container>
            <CreateTextDialog onCreate={this.createText}/>
            {loading ? <CustomLoader/> :
                <BasicTable data={texts} onUpdateText={this.updateText} onDeleteText={this.deleteText}/>}
        </Container>;
    }
}

const mapStateToProps = (state: globalState) => ({texts: state.texts, loading: state.loading});
const mapDispatchToProps = {getTexts, setLoadingStatus};
const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default AdminContainer;