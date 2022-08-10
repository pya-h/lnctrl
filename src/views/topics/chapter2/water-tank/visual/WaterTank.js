import React from 'react';
import './WaterTank.css';
import SubCard from "ui-component/cards/SubCard";
import { Button, Grid } from '@mui/material';

class VisualWaterTank extends React.Component {

    state = {
        waterLevel: 80,
        timerID: null
    };

    constructor(){
        super();
        this.i = 0;
    }

    startSimulation = () => {
        const {dt, y, max} = this.props;
        this.i = 0;
        clearInterval(this.state.timerID);
        
        const timerID = setInterval( () => {
            if(this.i >= y.length)
                clearInterval(timerID);
            this.i++;
            this.setState({waterLevel: 100 * y[this.i] / max});
        }, [dt * 1000]);
        this.setState({timerID});
    }

    stopSimulation = () => {
        clearInterval(this.state.timerID);
        this.i = 0;
        this.setState({timerID: null});
    }
    
    render () {

        return (
            <SubCard sx={{width:"100%"}} >
                <Grid container>
                    <Grid xs={6}>
                        <Button onClick={this.stopSimulation} sx={{width: '100%'}}>توقف</Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button onClick={this.startSimulation} sx={{width: '100%'}}>شروع</Button>
                    </Grid>
                </Grid>
                <hr />
                <Grid>
                    <div className="main-container">
                        <div className="tank">
                            <WaterContainer level={this.state.waterLevel}/>
                        </div>

                    </div>
                </Grid>
            </SubCard>
        );
    }
}

function WaterContainer (props) {
    let styles = {
        height : props.level +'%'
    }
    return (
        <div style={styles} className="water"></div>
    )
}


export default VisualWaterTank;