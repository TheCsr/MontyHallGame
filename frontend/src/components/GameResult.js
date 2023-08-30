import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";


function GameResult(props) {
    const { score} = props;
    const [data, setData] = useState([]);

    const receivedData = useSelector((state) => state.score);


    useEffect(() => {
        const dataMod = [{
            name: "wins",
            value: score && score.wins ? score.wins : 0
        },
        {
            name: "losses",
            value: score && score.losses ? score.losses : 0
        }
        ];
        setData(dataMod);


    }, [score])

    return (
        <div>
            {(receivedData && receivedData.loading === false && Object.keys(receivedData.data).length === 0) ? (
                <div>
                    <p></p>
                </div>
            ) : (
                (receivedData && receivedData.loading && receivedData.loading === true) ? (
                    <CircularProgress />
                ) : (
                    (receivedData.loading && receivedData.loading === false && Object.keys(receivedData.data).length >= 0) ? (
                        <div>
                            <h3>Win Vs Losses</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart width={600} height={300} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                            <p>Probability to win: {score['prob_win']}</p>
                            <p>Probability to loose: {score['prob_loss']}</p>
                        </div>
                    ) : (
                        <div>
                            <h3>Win Vs Losses</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart width={600} height={300} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                            <p>Probability to win: {score['prob_win']}</p>
                            <p>Probability to loose: {score['prob_loss']}</p>
                        </div>
                    )
                )
            )}
        </div>
    )
}
GameResult.propTypes = {
    score: PropTypes.object.isRequired
};

export default GameResult;